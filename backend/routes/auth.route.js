import { Router } from 'express';

import {
  authorizeMiddleware,
  validate,
} from '../middlewares/auth.middleware.js';
import {
  signupController,
  loginController,
  logoutController,
  checkAuthStatusController,
  forgotPasswordController,
  resetPasswordController,
  resendOtpController,
  verifyOptController,
} from '../controllers/auth.controller.js';
import { loginSchema, signupSchema } from '../utils/schemas.js';
const app = Router();

app.post('/signup', validate(signupSchema), signupController);

app.post('/login', validate(loginSchema), loginController);

app.post('/verify-otp', verifyOptController);

app.post('/resend-otp', resendOtpController);

app.get('/logout', authorizeMiddleware, logoutController);

app.get('/checkStatus', checkAuthStatusController);

app.post('/forgot-password', forgotPasswordController);

app.post('/reset-password', resetPasswordController);

export default app;
