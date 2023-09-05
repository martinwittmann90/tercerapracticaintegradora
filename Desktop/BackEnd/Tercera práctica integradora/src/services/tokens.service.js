import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import TokenDAO from '../DAO/classes/tokens.dao.js';
import UsersDAO from '../DAO/classes/user.dao.js';
import CustomError from '../error/customError.js';
import moment from 'moment-timezone';

const tokenDAO = new TokenDAO();
const usersDAO = new UsersDAO();

class TokenService {
  async generateResetToken(userId) {
    try {
      const tokenNumber = uuidv4();
      const currentTimeArgentina = moment.tz('America/Argentina/Buenos_Aires');
      const expiresAtArgentina = currentTimeArgentina.add(1, 'hour');
      const expiresAt = expiresAtArgentina.toDate();
      const tokenData = {
        userId: userId,
        tokenNumber: tokenNumber,
        expiresAt: expiresAt,
      };
      const newToken = await tokenDAO.createToken(tokenData);
      logger.debug('newToken:', newToken);
      return newToken;
    } catch (error) {
      logger.error(`Error generating token for user ID: ${userId}`, error);
      throw new CustomError({
        name: 'TokenGenerationError',
        cause: `Error generating token for user ID: ${userId}`,
        message: 'Error generating token.',
        code: 'TOKEN_GENERATION_ERROR',
        originalError: error,
      });
    }
  }
  async isResetTokenValidService(tokenNumber) {
    try {
      const tokenFinderOnDatabase = await tokenDAO.findTokenByToken(tokenNumber);
      logger.debug('Method isResetTokenValidService:', tokenFinderOnDatabase, tokenNumber);
      if (!tokenFinderOnDatabase) {
        logger.debug('Method isResetTokenValidService: Token not found');
        return false;
      }
      const currentTime = new Date();
      const expiresAt = tokenFinderOnDatabase.expiresAt;
      if (currentTime < expiresAt) {
        logger.debug('expiresAt es la fecha más futura.');
      } else if (currentTime > expiresAt) {
        logger.debug('currentTime es la fecha más futura.');
      } else {
        logger.debug('Ambas fechas son iguales.');
      }
      if (!expiresAt || currentTime >= expiresAt) {
        logger.debug(`Token expired or invalid: ${tokenNumber}`);
        return false;
      }
      logger.debug('Token received:', tokenNumber);
      logger.debug('Current time:', currentTime.toISOString());
      logger.debug('Token expiration:', expiresAt.toISOString());
      logger.debug('Is token valid? true');
      return true;
    } catch (error) {
      logger.error('Error in isResetTokenValidService:', error);
      throw error;
    }
  }
}

export default TokenService;
