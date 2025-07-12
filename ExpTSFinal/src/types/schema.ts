import Joi from 'joi';

export const majorSchema = Joi.object({
  code: Joi.string().max(4).required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().allow('').optional(),
});

export const userSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'As senhas não coincidem.'
  }),
  majorId: Joi.string().max(40).required(),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  majorId: Joi.string().length(36).required(),
});

export const sessionSchema = Joi.object({
  id : Joi.string().max(40).required(),
  userId: Joi.string().max(40).required(),
  score: Joi.number().integer().min(0).required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().optional(),
}).required();
