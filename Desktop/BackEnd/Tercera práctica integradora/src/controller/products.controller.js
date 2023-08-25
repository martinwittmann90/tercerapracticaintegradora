import ServiceProducts from '../services/products.service.js';
import CustomError from '../error/customError.js';
import { customErrorMsg } from '../error/customErrorMessage.js';
import EErros from '../error/enum.js';
import { logger } from '../utils/logger.js';
const serviceProducts = new ServiceProducts();
class ProductsController {
  async getAll(req, res) {
    try {
      const { limit, page, sort, query } = req.query;
      const products = await serviceProducts.getAllProducts(limit, page, sort, query);
      logger.info('Products retrieved');
      return res.status(200).json({
        status: 'success',
        msg: 'Products retrieved',
        payload: products,
      });
    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ Error: `${err}` });
    }
  }
  async getbyId(req, res) {
    try {
      const productId = req.params.id;
      const product = await serviceProducts.getProductById(productId);
      if (!product) {
        logger.warning('Product not found');
        return res.status(404).json({
          status: 'error',
          msg: 'Product not found',
        });
      }
      logger.info('Product retrieved');
      return res.status(200).json({
        status: 'success',
        msg: 'Product retrieved',
        payload: product,
      });
    } catch (error) {
      logger.error(error.message);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }
  async createOne(req, res) {
    try {
      const user = req.session.user;
      const productData = req.body;
      if (user.role === 'premium') {
        productData.owner = user.email;
        const createdProduct = await serviceProducts.createProduct(productData);
        return res.status(201).json({
          status: 'success',
          msg: 'Product created',
          payload: createdProduct,
        });
      } else {
        return res.status(403).json({
          status: 'error',
          msg: 'Permission denied',
        });
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ status: 'error', msg: error.message });
    }
  }

  async updateOne(req, res) {
    try {
      const productId = req.params.id;
      const productData = req.body;
      const user = req.session.user;
      const product = await serviceProducts.getProductById(productId);
      if (!product) {
        return res.status(404).json({
          status: 'error',
          msg: 'Product not found',
        });
      }
      if (user.role === 'admin' || (user.role === 'premium' && product.owner === user.email)) {
        const updatedProduct = await serviceProducts.updateProduct(productId, productData);
        if (!updatedProduct) {
          return res.status(404).json({
            status: 'error',
            msg: 'Product not found',
          });
        }
        return res.status(200).json({
          status: 'success',
          msg: 'Product updated',
          payload: updatedProduct,
        });
      } else {
        return res.status(403).json({
          status: 'error',
          msg: 'Permission denied',
        });
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ status: 'error', msg: error.message });
    }
  }
  async deleteOne(req, res) {
    try {
      const productId = req.params.id;
      const user = req.session.user;
      const product = await serviceProducts.getProductById(productId);
      if (!product) {
        return res.status(404).json({
          status: 'error',
          msg: 'Product not found',
        });
      }
      if (user.role === 'admin' || (user.role === 'premium' && product.owner === user.email)) {
        const deletedProduct = await serviceProducts.deleteProduct(productId);
        if (!deletedProduct) {
          return res.status(404).json({
            status: 'error',
            msg: 'Product not found',
          });
        }
        return res.status(200).json({
          status: 'success',
          msg: 'Product deleted',
          payload: deletedProduct,
        });
      } else {
        return res.status(403).json({
          status: 'error',
          msg: 'Permission denied',
        });
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ status: 'error', msg: error.message });
    }
  }
}
export const productsController = new ProductsController();
