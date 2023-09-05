import { logger } from '../utils/logger.js';
import ErrorService from '../services/error.service.js';

const errorService = new ErrorService();

class ErrorController {
  async logError(req, res) {
    try {
      const { message } = req.body;
      await errorService.logError(message);
      return res.status(200).json({ message: 'Error logged successfully' });
    } catch (error) {
      logger.error('Error in logError controller:', error.message);
      return res.status(500).json({ message: 'Error logging error' });
    }
  }

  async getErrorLogs(req, res) {
    try {
      const errorLogs = await errorService.getErrorLogs();
      return res.status(200).json({ errorLogs });
    } catch (error) {
      logger.error('Error in getErrorLogs controller:', error.message);
      return res.status(500).json({ message: 'Error retrieving error logs' });
    }
  }
}

export default ErrorController;
