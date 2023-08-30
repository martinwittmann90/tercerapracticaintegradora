import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';
import passport from 'passport';
import local from 'passport-local';
import UserModel from '../DAO/models/user.model.js';
import { compareHash, createHash } from '../config/bcrypt.js';
import dotenv from 'dotenv';
dotenv.config();
import config from './envConfig.js';
import GitHubStrategy from 'passport-github2';
import fetch from 'node-fetch';
import GoogleStrategy from 'passport-google-oauth20';

const localStrategy = local.Strategy;

import ServiceCarts from '../services/carts.service.js';
const serviceCarts = new ServiceCarts();

export default function initPassport() {
  passport.use(
    'register',
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { email, firstName, lastName, age } = req.body;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            logger.info('User already exists', { user: user });
            return done(null, false);
          }
          const newCart = await serviceCarts.createOne();
          const cartID = newCart.result.payload._id.toString();
          const newUser = new UserModel({
            email: email,
            firstName: firstName,
            lastName: lastName,
            age: Number(age),
            role: 'user',
            password: createHash(password),
            cartID: cartID,
          });
          await newUser.save();
          logger.info('User Registration successful', { user: newUser });
          const recoveryToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          newUser.resetToken = recoveryToken;
          newUser.resetTokenExpires = new Date(Date.now() + 3600000);
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          logger.error('Error in register', { error: error });
          return done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          logger.info('User Not Found with username (email)', { email: username });
          return done(null, false);
        }
        if (!compareHash(password, user.password)) {
          logger.info('Invalid Password');
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        githubcallbackURL: config.githubcallbackURL,
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);
          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;
          logger.info('GitHub profile:', { profile });
          let user = await UserModel.findOne({ email: profile.email });
          if (!user) {
            const newCart = await serviceCarts.createOne();
            const cartID = newCart.result.payload._id.toString();
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: null,
              age: 18,
              role: 'user',
              password: null,
              cartID: cartID,
            };
            user = await UserModel.create(newUser);
            logger.info('User Registration successful');
          }
          return done(null, user);
        } catch (e) {
          logger.error('Error in Auth GitHub!', { error: e });
          return done(e);
        }
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        googlecallbackURL: 'http://localhost:8080/api/sessions/oauth2/redirect/google',
        scope: ['profile'],
        state: true,
      },
      function verify(accessToken, refreshToken, profile, cb) {
        db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', ['https://accounts.google.com', profile.id], function (err, cred) {
          if (err) {
            return cb(err);
          }

          if (!cred) {
            db.run('INSERT INTO users (name) VALUES (?)', [profile.displayName], function (err) {
              if (err) {
                return cb(err);
              }
              var id = this.lastID;
              db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [id, 'https://accounts.google.com', profile.id], function (err) {
                if (err) {
                  return cb(err);
                }
                var user = {
                  id: id,
                  name: profile.displayName,
                };
                return cb(null, user);
              });
            });
          } else {
            // The account at Google has previously logged in to the app.  Get the
            // user record associated with the Google account and log the user in.
            db.get('SELECT * FROM users WHERE id = ?', [cred.user_id], function (err, user) {
              if (err) {
                return cb(err);
              }
              if (!user) {
                return cb(null, false);
              }
              return cb(null, user);
            });
          }
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}
