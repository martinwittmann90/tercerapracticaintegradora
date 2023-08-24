import express from 'express';
const chatRouter = express.Router();
import { chatController } from '../controller/chat.controller.js'
import { isUser, isLogged } from '../middleware/auth.js';

chatRouter.get('/', isUser, isLogged, chatController.chat);

export default chatRouter;