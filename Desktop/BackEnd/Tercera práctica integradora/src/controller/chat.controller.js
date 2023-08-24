import { logger } from "../utils/logger.js";

class ChatController{
    async chat (req, res) {
        try {
            logger.info('Access to chat page');
            res.render("chat", {});
        } catch (err) {
            logger.error(`Chat controller error: ${err}`);
            res.status(err.status || 500).json({ Error: `${err}` });
        }
    }
};

export const chatController = new ChatController();