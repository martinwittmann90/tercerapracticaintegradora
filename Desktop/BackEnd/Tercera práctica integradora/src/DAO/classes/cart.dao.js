import CartModel from '../models/cart.model.js';

class CartsDAO {
  async createCart() {
    const cart = await CartModel.create({});
    return cart;
  }
  async getCart(cartId) {
    const cart = await CartModel.findById(cartId).populate('products.product').lean();
    const cartProducts = cart.products;
    return { cartProducts, cart };
  }
  async updateCart(cid, cartUpdate) {
    const updatedCart = await CartModel.findByIdAndUpdate(cid, cartUpdate, { new: true });
    return updatedCart;
  }
  async deleteProductFromCart(cartId, cart) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
      return updatedCart;
    } catch (Error) {
      throw `Error deleting product from cart.`;
    }
  }
  async emptyCart(cid) {
    try {
      const emptyCart = await CartModel.findOneAndUpdate(cid, { products: [] }, { new: true });
      return emptyCart;
    } catch (err) {
      throw `Fallo al encontrar cart vaciar cart.`;
    }
  }
  async deleteCart(cid) {
    try {
      const cartDeleted = await CartModel.deleteOne(/* { _id: id } */);
      return cartDeleted;
    } catch (error) {
      logger.error(error);
    }
  }
}

export default CartsDAO;
