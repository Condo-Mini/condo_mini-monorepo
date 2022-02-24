import Joi from 'joi';

export const createByZipCodeValidationSchema = {
  body: Joi.object({
    street: Joi.string(),
    number: Joi.string().required(),
    zipCode: Joi.string().required(),
    notes: Joi.string(),
  }),
};
