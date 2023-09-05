import express from 'express';
import ErrorController from '../controller/error.controller.js';

const errorController = new ErrorController();
const errorRouter = express.Router();

errorRouter.post('/log-error', errorController.logError);
errorRouter.get('/get-error-logs', errorController.getErrorLogs);

export default errorRouter;
