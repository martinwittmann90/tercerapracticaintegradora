import express from 'express';
import passport from 'passport';
import { authController } from '../controller/session.controller.js';
import { isUser, isAdmin, isLogged, redirectIfLoggedIn, isNotAdmin, isCartOwner } from '../middleware/auth.js';
const sessionsRouter = express.Router();

sessionsRouter.get('/login', authController.renderLogin);
sessionsRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), authController.login);
sessionsRouter.get('/logout', authController.logout);
sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: 'failRegister' }), authController.register);
sessionsRouter.get('/failregister', authController.failRegister);
sessionsRouter.get('/faillogin', authController.failLogin);
sessionsRouter.get('/register', authController.renderRegister);
sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), authController.registerGithub);
sessionsRouter.get('/login/google', passport.authenticate('google', { scope: ['user:email'] }));
sessionsRouter.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/login' }), authController.registerGoogle);
sessionsRouter.get('/current', authController.getCurrent);
sessionsRouter.get('/admincontrol', isAdmin, authController.userDataBase);

sessionsRouter.get('/users/premium/:uid', isAdmin, authController.renderChangeUserRole);
sessionsRouter.post('/users/premium/:uid', isAdmin, authController.changeUserRole);

export default sessionsRouter;
