import Joi from 'joi-oid';
import userRoleEnum from '../../models/user/enums/userRoleEnum';

export const createUserValidationSchema = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(...Object.values(userRoleEnum)),
  }),
};

export const getUserValidationSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
