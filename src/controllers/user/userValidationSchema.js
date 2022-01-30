import Joi from 'joi';
import { userRoleEnum } from '../../models/enums/userEnums';

export default Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(...Object.values(userRoleEnum)),
});
