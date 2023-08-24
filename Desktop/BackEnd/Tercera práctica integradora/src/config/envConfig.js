import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program.option('--mode <mode>', 'Modo de trabajo', 'DEVELOPMENT');
program.parse();

dotenv.config({
  path: program.opts().mode === 'DEVELOPMENT' ? './.env.development' : './.env.production',
});

process.env.NODE_ENV = program.opts().mode;

export default {
  githubcallbackURL: process.env.GITHUB_CALLBACKURL,
  port: process.env.PORT,
  PERSISTENCE: process.env.PERSISTENCE,
  SESSION_SECRET: process.env.SESSION_SECRET,
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  mongoUrl: process.env.MONGO_URL,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASS: process.env.MONGO_PASS,
  DB_NAME: process.env.DB_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASS: process.env.GOOGLE_PASS,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  TWILIO_PHONE_WHATSAAP: process.env.TWILIO_PHONE_WHATSAAP,
};
