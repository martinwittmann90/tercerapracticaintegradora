import UserModel from '../DAO/models/user.model.js';
import { createHash, compareHash } from '../config/bcrypt.js';
import UsersDAO from '../DAO/classes/user.dao.js';
const usersDAO = new UsersDAO();
class ServiceUsers {
  async addUser(firstName, lastName, email, age, password) {
    try {
      const user = await UserModel.create({
        firstName,
        lastName,
        age: Number(age),
        email,
        password: createHash(password),
        role,
        cartID: '',
      });
      return { code: 201, result: { status: 'success', message: 'User created successfully', payload: user } };
    } catch (error) {
      throw `Error adding User. ${err}`;
    }
  }
  async login(email, password) {
    try {
      const account = await UserModel.findOne({ email });
      if (account) {
        if (!compareHash(password, account.password)) {
          return { code: 404, result: { status: 'error', message: 'Wrong user or password!' } };
        }
        return { code: 200, result: { status: 'success', message: 'User logged in successfully', payload: account } };
      } else {
        return { code: 404, result: { status: 'error', message: 'Account does not exists!' } };
      }
    } catch (error) {
      throw `Error logging in. ${err}`;
    }
  }
  async getAllUsersService() {
    try {
      const users = await usersDAO.getAllUsersDAO();
      return users;
    } catch (err) {
      throw err;
    }
  }
  async getUserByIdService(uid) {
    try {
      const user = await usersDAO.getUserByIdDAO({ _id: uid });
      return user;
    } catch (err) {
      throw new CustomError(`No se encontró user de id ${id}.`);
    }
  }
  async getUserByEmail(email) {
    try {
      const user = await usersDAO.getUserByEmailDAO(email);
      return user;
    } catch (error) {
      throw new Error('Error getting user by email: ' + error.message);
    }
  }
}

export default ServiceUsers;
