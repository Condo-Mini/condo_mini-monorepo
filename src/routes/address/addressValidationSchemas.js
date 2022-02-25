import Joi from 'joi';
import { zipCodePattern } from '../../constants/addressContants';

export const createByZipCodeValidationSchema = {
  body: Joi.object({
    street: Joi.string(),
    number: Joi.string().required(),
    zipCode: Joi.string().regex(zipCodePattern).required(),
    notes: Joi.string(),
  }),
};
