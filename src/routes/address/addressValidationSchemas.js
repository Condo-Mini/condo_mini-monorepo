import Joi from 'joi';
import { statePattern, zipCodePattern } from '../../constants/addressContants';

export const createByZipCodeValidationSchema = {
  body: Joi.object({
    street: Joi.string(),
    number: Joi.string().required(),
    zipCode: Joi.string().required(),
    notes: Joi.string(),
  }),
};

export const createAddressValidationSchema = {
  body: Joi.object({
    state: Joi.string().regex(statePattern).required(), 
    city: Joi.string().required(), 
    number: Joi.string().required(),  
    zipCode: Joi.string.regex(zipCodePattern).required(),
    areaCode: Joi.string().required(),
    details: Joi.string(),
    notes: Joi.string(),
  }),
};
