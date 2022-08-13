import Joi from 'joi';
import * as validators from './validators.js';

export default Object.entries(validators).reduce(
  (acc, [type, isValid]) =>
    acc.extend({
      type,
      messages: {
        invalid: `Invalid ${type}`,
      },
      validate: (value, { error }) => !isValid(value) && { value, errors: error('invalid') },
    }),
  Joi
);
