import MessageModel from "../DAO/models/message.model.js"

class ServiceChats {
  async getChat() {
    try {
      const allChat = await MessageModel.find({});
      return allChat;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOneChat(id) {
    try {
      const oneChat = await MessageModel.findById(id);
      return oneChat;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createChat(doc) {
    try {
      const newChat = await MessageModel.create(doc);
      return newChat;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateChat(id, doc) {
    try {
      await MessageModel.findByIdAndUpdate(id, doc);
      const chatUpdated = await MessageModel.findById(id);
      return chatUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteChat(id) {
    try {
      const deletedChat = await MessageModel.findByIdAndDelete(id);
      return deletedChat;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ServiceChats;
