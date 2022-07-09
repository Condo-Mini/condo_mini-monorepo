import Joi from 'joi';

export const loginValidationSchema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
