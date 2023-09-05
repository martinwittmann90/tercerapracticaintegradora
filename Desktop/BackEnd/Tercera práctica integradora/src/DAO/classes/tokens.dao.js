import CustomError from '../../error/customError.js';
import TokenModel from '../models/token.model.js';
import { logger } from '../../utils/logger.js';

const tokenModel = TokenModel;

class TokenDAO {
  async createToken(tokenData) {
    try {
      const newToken = await tokenModel.create(tokenData);
      logger.debug(`tokenDAO: Token has been created, the token number is: ${newToken.tokenNumber}`);
      return newToken;
    } catch (error) {
      logger.error('Error creating token:', error);
      throw new CustomError({
        name: 'TokenCreationError',
        cause: 'Error creating token in the database.',
        message: 'Error creating token.',
        code: 'TOKEN_CREATION_ERROR',
        originalError: error,
      });
    }
  }

  async findTokenByToken(tokenNumber) {
    try {
      return await tokenModel.findOne({ tokenNumber });
    } catch (error) {
      throw new Error('Error finding reset token: ' + error.message);
    }
  }

  async deleteToken(token) {
    try {
      return await tokenModel.deleteOne({ tokenNumber });
    } catch (error) {
      throw new Error('Error deleting token: ' + error.message);
    }
  }
}

export default TokenDAO;
