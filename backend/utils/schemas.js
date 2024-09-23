import joi from 'joi';
export const signupSchema = joi.object({
  username: joi.string().required().max(30).min(3).messages({
    'string.empty': 'username cannot be empty',
    'string.min': 'username must be at least 3 characters long',

    'string.max': 'username must be at most 30 characters long',
  }),
  email: joi.string().required().email().messages({
    'string.empty': 'email cannot be empty',
    'string.email': 'email must be a valid email',
  }),
  password: joi.string().required().min(6).messages({
    'string.empty': 'password cannot be empty',
    'string.min': 'password must be at least 6 characters long',
  }),
});

export const loginSchema = joi.object({
  email: joi.string().required().email().messages({
    'string.empty': 'email cannot be empty',
    'string.email': 'email must be a valid email',
  }),
  password: joi.string().required().min(6).messages({
    'string.empty': 'password cannot be empty',
    'string.min': 'password must be at least 6 characters long',
  }),
});
