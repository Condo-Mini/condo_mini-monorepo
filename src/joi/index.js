import Joi from 'joi';
import * as validators from './validators';

const customJoi = Object.values(validators).reduce(
  (acc, { type, errorMessage = 'Invalid value', isValid }) =>
    acc.extend({
      type,
      messages: {
        invalid: errorMessage,
      },
      validate: (value, { error }) => !isValid(value) && { value, errors: error('invalid') },
    }),
  Joi
);

export default customJoi;
