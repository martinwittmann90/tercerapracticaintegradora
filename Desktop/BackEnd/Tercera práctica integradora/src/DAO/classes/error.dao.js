import ErrorModel from '../models/error.model.js';

class ErrorDAO {
  async createError(message) {
    try {
      return await ErrorModel.create({ message });
    } catch (error) {
      throw new Error('Error creating error log: ' + error.message);
    }
  }
  async getErrors() {
    try {
      return await ErrorModel.find().exec();
    } catch (error) {
      throw new Error('Error getting error logs: ' + error.message);
    }
  }
}

export default ErrorDAO;
