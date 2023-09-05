import { logger } from '../utils/logger.js';
import ErrorDAO from '../DAO/classes/error.dao.js';

const errorDAO = new ErrorDAO();

class ErrorService {
  async logError(message) {
    try {
      await errorDAO.createError(message);
      logger.error('Error logged:', message);
    } catch (error) {
      logger.error('Error logging error:', error.message);
    }
  }

  async getErrorLogs() {
    try {
      return await errorDAO.getErrors();
    } catch (error) {
      logger.error('Error retrieving error logs:', error.message);
      return [];
    }
  }
}

export default ErrorService;
