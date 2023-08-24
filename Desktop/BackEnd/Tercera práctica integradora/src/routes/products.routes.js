import express from 'express';
import { productsController } from '../controller/products.controller.js';
/* import { uploader } from "../utils.js"; */
export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getbyId);
productsRouter.post('/', /* uploader.single('thumbnail') , */ productsController.createOne);
productsRouter.put('/:id', productsController.updateOne);
productsRouter.delete('/:id', productsController.deleteOne);

export default productsRouter;
