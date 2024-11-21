import { findUser, sendEmail, salt, generateOtp } from '../utils/index.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/index.js';
import { sendOtpEmail, otpExpiryTime } from '../utils/index.js';

export const signupController = async (req, res) => {
  try {
    const { username, email, password, profileImg } = req.body;

    const userExists = await findUser(email);

    if (userExists) {
      return res.status(400).send({
        status: false,
        message: 'User already exists',
        error: 'signup failed',
      });
    }

    const hashedPassword = bcryptjs.hashSync(password, salt);
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + otpExpiryTime);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        profileImg,
      },
    });

    await sendOtpEmail(email, otp);
    res.status(200).send({
      status: true,
      data: { email: user.email },
      message: 'Signup successful, OTP sent to your email',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: 'signup failed', error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await findUser(email);

    if (!userExists) {
      return res.status(400).json({
        status: false,
        message: 'User not found, please signup',
        error: 'login failed',
      });
    }
    const validPassword = bcryptjs.compareSync(password, userExists.password);
    if (!validPassword) {
      return res.status(400).json({
        status: false,
        message: 'Invalid password',
        error: 'login failed',
      });
    }
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + otpExpiryTime);

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        otp,
        otpExpiry,
      },
    });
    await sendOtpEmail(email, otp);
    res.status(200).send({
      status: true,
      data: { email: user.email },
      message: 'login success, OTP sent to your email',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: 'login failed', error: error.message });
  }
};
export const verifyOptController = async (req, res) => {
  const { email, otp } = req.body;
  const user = await findUser(email);
  if (user && user.otp === otp && user.otpExpiry > new Date()) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        otp: null,
        otpExpiry: null,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        profileImg: user.profileImg,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    res.cookie('jwt', token, {
      httpOnly: true, // Prevent access by JavaScript
      secure: process.env.ENV == 'dev' ? false : true, // Ensure the cookie is sent over HTTPS
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    res.status(201).send({
      status: true,
      message: 'OTP verified successfully',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
        role: user.role,
      },
    });
  } else {
    res.status(400).send({
      status: false,
      message: 'Invalid OTP or OTP expired',
      error: ' failed to verify otp',
    });
  }
};

export const resendOtpController = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + otpExpiryTime);

  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        otp,
        otpExpiry,
      },
    });

    await sendOtpEmail(email, otp);
    res.status(200).send({
      status: true,
      message: 'OTP has been resent successfully',
      data: { email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: 'Error resending OTP',
      error: error.message,
    });
  }
};
export const logoutController = async (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true, // Prevent access by JavaScript
    secure: process.env.ENV == 'dev' ? false : true, // Ensure the cookie is sent over HTTPS
    sameSite: 'strict',
  });
  const token = req.cookies?.jwt;
  res.send({ status: true, data: null, message: 'success' });
};

export const checkAuthStatusController = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.send({
        status: false,
        message: 'no token found',
        error: 'unauthenticated',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.send({
        status: false,
        message: 'invalid token',
        error: 'unauthenticated',
      });
    }
    res.send({ status: true, data: decoded, message: 'success' });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: 'server error',
      error: 'server error',
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    if (!req?.body?.email) {
      res.status(400).json({
        status: false,
        message: 'Email is required',
        error: 'forgot password failed',
      });
    }
    const { email } = req.body;

    const user = await findUser(email);
    if (!user) {
      res.status(400).json({
        status: false,
        message: 'User not found',
        error: 'forgot password failed',
      });
    }
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET
    );
    const url = `${process.env.FRONTEND_BASE_URL}/reset-password?token=${token}`;

    await sendEmail(email, 'Reset your password', url);

    res.send({
      status: true,
      data: { email: user.email },
      message: 'Password reset link sent',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: 'failed to send reset password link',
      error: error.message,
    });
  }
};
export const resetPasswordController = async (req, res) => {
  try {
    if (!req?.body?.token)
      res.status(400).json({
        status: false,
        message: 'failed to reset password',
        error: 'reset password failed',
      });
    if (!req?.body?.password)
      res.status(400).json({
        status: false,
        message: 'password is required',
        error: 'reset password failed',
      });

    const { token, password } = req.body;
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!isValidToken)
      res.status(400).json({
        status: false,
        message: 'invalid token',
        error: 'reset password failed',
      });

    const hashedPassword = bcryptjs.hashSync(password);
    const updatedUser = await prisma.user.update({
      where: {
        email: isValidToken.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    res.status(201).json({
      status: true,
      data: { email: updatedUser.email },
      message: 'password reset successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: 'failed to reset password',
      error: error.message,
    });
  }
};
