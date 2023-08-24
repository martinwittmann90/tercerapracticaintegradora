import UserModel from '../models/user.model.js';

class UsersDAO {
  async getAllUsersDAO() {
    const users = await UserModel.find(); /* .populate('products.product').lean() */
    console.log(users);
    return users;
  }
  catch(Error) {
    throw `Error finding all users`;
  }
  async getUserByIdDAO(uid) {
    const user = await UserModel.findById(uid); /* .populate('products.product').lean() */
    return user;
  }
  catch(Error) {
    throw `Error finding user`;
  }
  async updateUserDAO(uid, userUpdate) {
    const updatedUser = await UserModel.findByIdAndUpdate(cid, userUpdate, { new: true });
    return updatedUser;
  }
  catch(Error) {
    throw `Error updating user`;
  }
  async deleteUserDAO(uid, user) {
    try {
      const deleteUSer = await CartModel.findByIdAndUpdate(uid, user, { new: true });
      return deleteUSer;
    } catch (Error) {
      throw `Error deleting user`;
    }
  }
}

export default UsersDAO;
