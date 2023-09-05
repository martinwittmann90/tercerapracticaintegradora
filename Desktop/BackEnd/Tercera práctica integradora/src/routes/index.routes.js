import { Router } from 'express';
import viewsRouter from '../routes/view.routes.js';
import productsRouter from '../routes/products.routes.js';
import cartsRouter from '../routes/carts.routes.js';
import chatRouter from '../routes/chat.routes.js';
import sessionsRouter from '../routes/sessions.routes.js';
import mockRouter from '../routes/mock.routes.js';
import messageandmailRouter from '../routes/messageandmail.routes.js';
import tokensRouter from '../routes/tokens.routes.js';
import errorHandler from '../middleware/error.js';
const indexRouter = Router();

/*-------PLANTILLAS-------*/
indexRouter.use('/', viewsRouter);
indexRouter.use('/realtimeproducts', viewsRouter);
indexRouter.use('/products', viewsRouter);
indexRouter.use('/chat', chatRouter);
indexRouter.use('/carts', cartsRouter);
indexRouter.use('/auth/profile', sessionsRouter);
indexRouter.use('/', messageandmailRouter);
indexRouter.use('/', mockRouter);
indexRouter.use('/', tokensRouter);
/*-------END POINTS-------*/
indexRouter.use('/api/products', productsRouter);
indexRouter.use('/api/carts', cartsRouter);
indexRouter.use('/api/sessions', sessionsRouter);
indexRouter.get('/*', async (req, res) => {
  res.render('notfound');
});
/*-------Error handler-------*/
indexRouter.use(errorHandler);

export default indexRouter;
