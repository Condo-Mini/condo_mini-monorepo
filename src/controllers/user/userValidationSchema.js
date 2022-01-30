import Joi from 'joi';

export default Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string(),
});
