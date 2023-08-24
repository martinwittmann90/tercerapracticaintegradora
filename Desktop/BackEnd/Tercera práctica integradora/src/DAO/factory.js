import envConfig from '../../config/env.config';
import { logger } from '../../utils/logger.config';

let MessagesDAO;
let CartsDAO;
let ProductsDAO;
let TicketsDAO;

switch (envConfig.PERSISTENCE) {
  case 'MONGO':
    logger.info('Persistance with MongoDB');
    const { default: ProductsMongo } = await import ('./classes/product.dao.js');
    ProductsDAO = ProductsMongo
    const { default: CartsMongo } = await import ('./classes/cart.dao.js');
    CartsDAO = CartsMongo
    const { default: TicketsMongo } = await import ('./classes/tickets.dao.js');
    TicketsDAO = TicketsMongo
    const { default: MessagesMongo } = await import ('./classes/messages.dao.js');
    MessagesDAO = MessagesMongo
    break;
  case 'FILESYSTEM':
    logger.info('Persistence with FileSystem');
    const { default: ProductsFS } = await import('./appManager/fsdao/products.fs.dao')
    ProductsDAO = ProductsFS
    const { default: CartsFS } = await import('./appManager/fsdao/carts.fs.dao')
    CartsDAO = CartsFS
    const { default: MessagesFS } = await import('./appManager/fsdao/messages.fs.dao')
    MessagesDAO = MessagesFS
    const { default: TicketsFS } = await import('./appManager/fsdao/tickets.fs.dao')
    TicketsDAO = TicketsFS
    break;
  case 'MEMORY':
    logger.info('Persistence with Memory');
    break;

  default:
    throw new Error('Invalid persistence type');
}

export { MessagesDAO, CartsDAO, ProductsDAO, TicketsDAO };