import express from 'express';
import TokenController from '../controller/tokens.controller.js';

const tokenController = new TokenController();
const tokensRouter = express.Router();

// Render forget password page
tokensRouter.get('/forget-password', tokenController.renderForgetPassword);

// Handle password reset form submission
tokensRouter.post('/forget-password', tokenController.sendPasswordResetEmail);

// Handle password reset link (GET)
tokensRouter.get('/reset-password/:token', tokenController.handlePasswordResetFromEmail);

// Handle password reset link (POST)
tokensRouter.post('/reset-password', tokenController.postPassword);

export default tokensRouter;
