import Joi from '../../joi/index.js';

export const createByZipCodeValidationSchema = {
  body: Joi.object({
    street: Joi.string(),
    number: Joi.string().required(),
    zipCode: Joi.zipCode().required(),
    notes: Joi.string(),
  }),
};
