import ServiceCarts from '../services/carts.service.js';
const serviceCarts = new ServiceCarts();
import ServiceProducts from '../services/products.service.js';
const serviceProducts = new ServiceProducts();
import { logger } from '../utils/logger.js';

class CartController {
  async createCart(req, res) {
    try {
      const newCart = await serviceCarts.createOne();
      logger.info('New cart created:', newCart);
      res.status(201).json(newCart);
    } catch (error) {
      logger.error('Error creating cart:', error);
      res.status(500).json({ status: 'error', message: `Error creating cart. ${err}` });
    }
  }
  async getById(req, res) {
    try {
      const cartId = req.params.cid;
      const cart = await serviceCarts.getCartService(cartId);
      logger.info(`Cart retrieved by ID ${cartId}:`, cart);
      res.status(200).json(cart);
    } catch (err) {
      logger.error('Error getting cart by ID:', err);
      res.status(404).json({ status: 'error', message: 'Error getting cart'`${err}` });
    }
  }
  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const user = req.session.user;
      const product = await serviceProducts.getProductById(pid);
      if (user.role === 'premium' && product.owner === user.email) {
        return res.status(403).json({
          status: 'error',
          message: 'Permission denied: Cannot add your own product to cart',
        });
      }
      const cart = await serviceCarts.addProductToCartService(cid, pid);
      logger.info(`Product ${pid} added to cart ${cid}:`, cart);
      res.status(200).json(cart);
    } catch (err) {
      logger.error('Error adding product to cart:', err);
      res.status(404).json({ status: 'error', message: ` Error adding product to cart${err}` });
    }
  }
  async deletOneProductbyCart(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const pQuantity = req.body.quantity;
      const cart = await serviceCarts.deleteProductFromCart(cid, pid, pQuantity);
      logger.info(`Product ${pid} deleted from cart ${cid}:`, cart);
      res.status(200).json({ status: 'success', message: 'Product removed from cart', cart });
    } catch (err) {
      logger.error('Error deleting product from cart:', err);
      res.status(500).json({ status: 'error', message: `Internal server error. ${err}` });
    }
  }
  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const cart = await serviceCarts.updateCartService(cid, products);
      logger.info(`Cart ${cid} updated:`, cart);
      res.status(200).json({ status: 'success', message: 'Cart updated successfully', cart });
    } catch (err) {
      logger.error('Error updating cart:', err);
      res.status(500).json({ status: 'error', message: `Internal server error. ${err}` });
    }
  }
  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await serviceCarts.updateProductQuantity(cid, pid, quantity);
      logger.info(`Product ${pid} quantity updated in cart ${cid}:`, cart);
      res.status(200).json({ status: 'success', message: 'Product quantity updated', cart });
    } catch (err) {
      logger.error('Error updating product quantity:', err);
      res.status(500).json({ status: 'error', message: `Internal server error. ${err}` });
    }
  }
  async clearCart(req, res) {
    try {
      const cid = req.params.cid;
      const cart = await serviceCarts.clearCartService(cid);
      logger.info(`Clearing cart ${cid}`);
      res.status(200).json(cart);
    } catch (err) {
      logger.error('Error clearing cart:', err);
      res.status(404).json({ Error: `${err}` });
    }
  }
}
export default CartController;
