import express from 'express';
import { isUser, isLogged, isNotAdmin, isCartOwner } from '../middleware/auth.js';
import CartController from '../controller/carts.controller.js';
const cartController = new CartController();
import { ticketsController } from '../controller/ticket.controller.js';
const cartsRouter = express.Router();

cartsRouter.post('/', cartController.createCart);
cartsRouter.get('/:cid', cartController.getById);
cartsRouter.post('/:cid/product/:pid', isUser, isLogged, isNotAdmin, isCartOwner, cartController.addProductToCart);
cartsRouter.put('/:cid', cartController.updateCart);
cartsRouter.delete('/delete/:cid/product/:pid', cartController.deletOneProductbyCart);
cartsRouter.delete('/empty/:cid', cartController.clearCart);
cartsRouter.get('/:cid/purchase', isLogged, isUser, ticketsController.checkOut);
cartsRouter.post('/:cid/purchase', isLogged, isUser, ticketsController.addTicket);
cartsRouter.get('/purchase/:cid', isLogged, isUser, ticketsController.addTicket);

export default cartsRouter;
