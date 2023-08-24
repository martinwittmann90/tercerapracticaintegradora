import express from 'express';
import { mockController } from '../controller/mock.controller.js';
const mockRouter = express.Router();

mockRouter.get('/mockingproducts', mockController.getMockingProducts);

export default mockRouter;
