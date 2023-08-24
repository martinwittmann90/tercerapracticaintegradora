import ServiceCarts from "../services/carts.service.js";
const serviceCarts = new ServiceCarts();
import ServiceTickets from "../services/tickets.service.js";
const serviceTickets = new ServiceTickets();
import { logger } from "../utils/logger.js";

class TicketsController {
  async addTicket(req, res) {  
      try {
        const user = req.session.user;
        const userCartId = user.cartID;
        const purchaser = user.email;
        const ticketPreview = await serviceTickets.stockCartProductsForTicket(userCartId);
        const ticket = ticketPreview.cartWithStock;
        const totalCart = ticketPreview.totalPriceTicket;
        const oldProductsCart = ticketPreview.cartWithOutStock;
        logger.info('Creating new ticket...');
        logger.debug(`User: ${purchaser}, Total: ${totalCart}`);
        await serviceCarts.updateCartService(userCartId, oldProductsCart );
        await serviceTickets.addTicket(purchaser, ticket, totalCart);
        logger.info('Ticket created successfully.');
        return res.render('ticketsdone', { ticket, totalCart, purchaser });
              
      }catch (err) {
        logger.error(`Failed to create ticket: ${err}`);
        res.status(500).json({ Error: `${err}` });
      };
  };
  async checkOut(req, res) {  
    try {
        const user = req.session.user;
        const userCartId = user.cartID;
        logger.info('Performing the checkout process...');
        logger.debug(`User: ${user.email}, CartID: ${userCartId}`);
        const cartProducts = await serviceCarts.getCartService(userCartId);
        const ticketPreview = await serviceTickets.stockCartProductsForTicket(userCartId);
        logger.info('Checkout completed.');
        return res.render('tickets', { user, cartProducts,ticketPreview, userCartId });
        }catch (err) {
          logger.error(`Error during checkout: ${err}`);
          res.status(500).json({ Error: `${err}` });
        };
    };
};

export const ticketsController = new TicketsController();
