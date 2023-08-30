import { logger } from '../utils/logger.js';
import ServiceProducts from '../services/products.service.js';
import ServiceCarts from '../services/carts.service.js';
import userDTO from '../DAO/DTO/user.dto.js';
const serviceProducts = new ServiceProducts();
const serviceCarts = new ServiceCarts();

class ViewsController {
  async getAll(req, res) {
    try {
      const { page, limit, sort, query } = req.query;
      const user = new userDTO(req.session.user);
      const queryResult = await serviceProducts.getAllProducts(page, limit, sort, query);
      const { docs, ...paginationInfo } = queryResult;
      const productsVisualice = docs.map((product) => {
        return {
          _id: product._id.toString(),
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          code: product.code,
          stock: product.stock,
          category: product.category,
          status: product.status,
        };
      });
      const response = {
        status: 'success',
        payload: productsVisualice,
        totalPages: paginationInfo.totalPages,
        prevPage: paginationInfo.prevPage,
        nextPage: paginationInfo.nextPage,
        page: parseInt(paginationInfo.page),
        hasPrevPage: paginationInfo.hasPrevPage,
        hasNextPage: paginationInfo.hasNextPage,
      };
      const prevPage = parseInt(page) - 1;
      response.hasPrevPage ? (response.prevLink = `/products/?page=${prevPage}&limit=${limit}&sort=${sort}`) : (response.prevLink = null);
      const nextPage = parseInt(page) + 1;
      response.hasNextPage ? (response.nextLink = `/products/?page=${nextPage}&limit=${limit}&sort=${sort}`) : (response.nextLink = null);
      if (parseInt(page) > paginationInfo.totalPages || parseInt(page) < 1) {
        throw new Error('The requested page does not exist');
      }
      const nextPageUrl = `/?page=${nextPage}&limit=${limit}&sort=${sort}`;
      const productsContext = {
        isAdmin: user.isAdmin,
        isPremium: user.isPremium,
        userCartID: user.cartID,
        session: req.session.user,
        productsVisualice: productsVisualice,
        paginationInfo: paginationInfo,
        nextPageUrl: nextPageUrl,
        sort: sort,
        query: query,
      };
      res.render('products', productsContext);
      logger.info('Get all products function called successfully.');
    } catch (error) {
      logger.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }
  async getCartById(req, res, next) {
    try {
      const { cid } = req.params;
      const cart = await serviceCarts.getCartService(cid);
      const user = req.session.user;
      const userCartId = user.cartID;
      const session = req.session.user;
      const simplifiedCart = cart.cartProducts.map((item) => {
        if (item.product) {
          return {
            title: item.product.title,
            price: item.product.price,
            _id: item.product._id,
            quantity: item.quantity,
          };
        }
        return null;
      });
      res.render('carts', { cart: simplifiedCart, userCartId, session });
    } catch (error) {
      logger.error(error, { cart: simplifiedCart, userCartId });
      next(error);
    }
  }
  async getLoginHome(req, res) {
    try {
      res.cookie('cookie-test', 'guardando cookie', {
        maxAge: 900000,
        httpOnly: true,
      });
      if (req.session.count) {
        req.session.count++;
      } else {
        req.session.count = 1;
      }
      logger.info(`Visitas: ${req.session.count}`);
      logger.info(`usuario guardado en session: ${req.user}`);
      const { register, login } = req.query;
      const session = req.session;
      if (register === 'true' && !session.user) return res.render('register');
      if (login === 'true' && !session.user) return res.render('login');
      const context = { session: session.user };
      res.render('home', context);
      logger.info('Get login function called successfully.');
    } catch (err) {
      res.status(err.status || 500).json({
        status: 'error',
        payload: err.message,
      });
    }
  }
  async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await serviceProducts.getProductById(pid);
      const productSimplificado = {
        _id: product._id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
      };
      res.render('product', { product: productSimplificado });
      logger.info('Get product function called successfully.');
    } catch (err) {
      res.status(err.status || 500).json({
        status: 'error',
        message: 'error seleccionado producto',
        payload: err.message,
      });
    }
  }

  async realTimeProducts(req, res) {
    try {
      const user = req.session.user;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (user.role !== 'premium' && user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      const { page, limit, sort, query } = req.query;
      const queryResult = await serviceProducts.getAllProducts(page, limit, sort, query);
      const { docs, ...paginationInfo } = queryResult;
      const productsVisualice = docs.map((product) => {
        return {
          _id: product._id.toString(),
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          code: product.code,
          stock: product.stock,
          category: product.category,
          owner: product.owner,
        };
      });
      const nextPage = parseInt(page) + 1;
      const nextPageUrl = `/realtimeproducts?page=${nextPage}&limit=${limit}&sort=${sort}`;
      const realTimeProductsUser = new userDTO(req.session.user);
      const realTimeProductsContext = {
        isAdmin: realTimeProductsUser.isAdmin,
        isPremium: realTimeProductsUser.isPremium,
        session: req.session.user,
      };
      const realTimeProductsRender = {
        productsVisualice,
        paginationInfo,
        nextPageUrl,
        sort,
        realTimeProductsContext,
      };
      res.render('realtimeproducts', { realTimeProductsRender });
      logger.info('realTimeProducts function called successfully.');
    } catch (error) {
      logger.error(error);
    }
  }
  async testLogger(req, res) {
    try {
      logger.debug('Debug message.');
      logger.http('HTTP message.');
      logger.info('Information message.');
      logger.warn('Warning message.');
      logger.error('Error message.');
      logger.fatal('Fatal message.');
      return res.status(200).json({ status: 'success', message: 'Running a test, see results in the console' });
    } catch (error) {
      logger.error(error);
    }
  }
}

export const viewsController = new ViewsController();
