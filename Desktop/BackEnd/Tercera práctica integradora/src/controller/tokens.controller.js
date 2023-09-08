import { logger } from '../utils/logger.js';
import { createHash } from '../config/bcrypt.js';
import TokenService from '../services/tokens.service.js';
import ServiceUsers from '../services/user.service.js';
import { mailController } from '../controller/messageandmail.controller.js';
import CustomError from '../error/customError.js';
const tokenService = new TokenService();
const serviceUsers = new ServiceUsers();

class TokenController {
  async renderForgetPassword(req, res) {
    logger.debug('Rendering forget password page');
    return res.render('forgetPassword', {});
  }
  async sendPasswordResetEmail(req, res) {
    try {
      const { email } = req.body;
      const trimmedEmail = email.trim();
      logger.debug(trimmedEmail);
      if (!trimmedEmail) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }
      const user = await serviceUsers.getUserByEmail(trimmedEmail);
      logger.debug(user);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const token = await tokenService.generateResetToken(user._id); //
      const resetLink = `http://localhost:8080/reset-password/${token.tokenNumber}`;
      const mailOptions = {
        from: mailController.GOOGLE_EMAIL,
        to: email,
        subject: 'Recuperación de Contraseña',
        html: `Para restablecer tu contraseña, haz clic en el siguiente enlace: <a href="${resetLink}">${resetLink}</a>`,
      };
      await mailController.sendMail(mailOptions);
      logger.debug(`Password reset email sent to: ${email}`);
      logger.debug(`Reset link: ${resetLink}`);
      return { success: true, message: 'Recovery email sent.' };
    } catch (error) {
      logger.error('Error sending recovery email:', error);
      throw new CustomError({
        name: 'EmailSendError',
        cause: `Error sending recovery email to: ${email}`,
        message: 'Error sending recovery email.',
        code: 'EMAIL_SEND_ERROR',
        originalError: error,
      });
    }
  }
  async handlePasswordResetFromEmail(req, res) {
    try {
      const { token } = req.params;
      if (!token) {
        return res.status(400).render('resetPasswordExpired');
      }
      const isTokenValid = await tokenService.isResetTokenValidService(token);
      if (isTokenValid) {
        return res.render('resetPassword', { token: token });
      } else {
        return res.render('resetPasswordExpired');
      }
    } catch (error) {
      logger.error('Error in handlePasswordResetFromEmail:', error);
      return res.status(500).render('resetPasswordExpired');
    }
  }

  async postPassword(req, res) {
    try {
      const { newPassword, email } = req.body;
      if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email and newPassword are required' });
      }
      const user = await serviceUsers.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.password = createHash(newPassword);
      await user.save();
      return res.render('resetPasswordSuccess');
    } catch (error) {
      console.error('Error in postPassword:', error);
      return res.status(400).json({ message: 'Invalid token' });
    }
  }
}

export default TokenController;
