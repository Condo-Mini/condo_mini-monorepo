import Joi from '../../joi';

export const createByZipCodeValidationSchema = {
  body: Joi.object({
    street: Joi.string(),
    number: Joi.string().required(),
    zipCode: Joi.zipCode().required(),
    notes: Joi.string(),
  }),
};
