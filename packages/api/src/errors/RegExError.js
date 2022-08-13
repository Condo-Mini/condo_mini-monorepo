import BaseError from './BaseError.js';
import messages from '../messages/index.js';
import httpStatus from '../constants/httpStatus.js';

export default class RegExError extends BaseError {
  constructor(error) {
    super(error);

    this.error = {
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.get('ERROR.REGEX.INVALID_EXPRESSION', error.expression, error.pattern),
    };
  }
}
