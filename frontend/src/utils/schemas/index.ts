import Joi from 'joi';
import { signUpSchemaType } from '../types';

export const signupSchema = Joi.object<signUpSchemaType>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email is required',
    }),
  username: Joi.string().required().min(3).messages({
    'string.min': 'Username must be at least 3 characters long',
    'string.empty': 'Username is required',
  }),
  password: Joi.string().required().min(6).messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email is required',
    }),
  password: Joi.string().required().min(6).messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
  }),
});
