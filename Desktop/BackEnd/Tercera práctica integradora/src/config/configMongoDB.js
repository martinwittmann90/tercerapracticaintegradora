import { connect } from 'mongoose';
import 'dotenv/config';
import config from './envConfig.js';
import { logger } from '../utils/logger.js';

export async function connectMongo() {
  try {
    await connect(config.mongoUrl);
    logger.info('Connected successfully to MongoDB');
  } catch (e) {
    logger.error(e);
    throw 'Can not connect to mongo';
  }
}
