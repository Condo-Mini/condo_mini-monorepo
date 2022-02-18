import Joi from 'joi';
import { zipCodePattern } from '../../constants/addressContants';

export const createByZipCodeValidationSchema = {
  body: Joi.object({
    zipCode: Joi.string()
      // .regex(/\d{2}\.?\d{3}-?\d{3}/)
      .required(),
    number: Joi.string().required(),
    details: Joi.string(),
    notes: Joi.string(),
  }),
};
