import { uploader } from '../utils/utils.js';
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
      /*       logger.info('Create Product Controller Reached');
      logger.debug('Form Data:', req.body); */
      /*       uploader.single('thumbnail')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          logger.error('Multer Error:', err);
          return res.status(400).json({ error: 'Error de subida de archivo' });
        } else if (err) {
          logger.error('Error:', err);
          return res.status(500).json({ error: 'Error de servidor' });
        }
        logger.debug('File Uploaded Successfully:', req.file); */
      const user = req.session.user;
      const productData = req.body;
      if (user.role === 'premium') {
        productData.owner = user.email;
        const createdProduct = await serviceProducts.createProduct(productData);
        return res.status(200).redirect('/realtimeproducts');
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
      const updatedProduct = req.body;
      const user = req.session.user;
      const existingProduct = await serviceProducts.getProductById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          status: 'error',
          msg: 'Product not found',
        });
      }
      if (user.role === 'admin') {
        const updated = await serviceProducts.updateProduct(productId, updatedProduct);
        if (!updated) {
          return res.status(500).json({
            status: 'error',
            msg: 'Failed to update product',
          });
        }
        return res.status(200).json({
          status: 'success',
          msg: 'Product updated',
          payload: updated,
        });
      } else if (user.role === 'premium' && existingProduct.owner === user.email) {
        const updated = await serviceProducts.updateProduct(productId, updatedProduct);
        if (!updated) {
          return res.status(500).json({
            status: 'error',
            msg: 'Failed to update product',
          });
        }
        return res.status(200).json({
          status: 'success',
          msg: 'Product updated',
          payload: updated,
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
      if (user.role === 'admin') {
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
      } else if (user.role === 'premium' && product.owner === user.email) {
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
