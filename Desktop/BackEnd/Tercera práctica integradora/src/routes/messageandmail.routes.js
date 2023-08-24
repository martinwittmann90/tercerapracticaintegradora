import express from 'express';
import { mailController } from '../controller/messageandmail.controller.js';
import { smsController } from '../controller/messageandmail.controller.js';
const messageandmailRouter = express.Router();

messageandmailRouter.get('/mail', async (req, res) => {
    try {
        const response = await mailController.sendMail();
        res.send(response);
    } catch (error) {
        res.status(500).send('Error sending email');
    }
  });

messageandmailRouter.get('/sms', async (req, res) => {
    try {
        const response = await smsController.sendSms();
        res.send(response);
    } catch (error) {
        res.status(500).send('Error sending SMS');
    }
});

export default messageandmailRouter;
