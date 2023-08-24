import MessageModel from '../models/message.model.js';
class MessagesDAO {
  async getAll() {
    try {
      const menssages = await MessageModel.find({});
      return menssages;
    } catch (error) {
      logger.error(error);
    }
  }

  async add(message) {
    try {
      const newMessage = await MessageModel.create(message);
      return newMessage;
    } catch (error) {
      logger.error(error);
    }
  }
}

export default MessagesDAO;
