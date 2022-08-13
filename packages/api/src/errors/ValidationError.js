import httpStatus from '../constants/httpStatus.js';
import messages from '../messages/index.js';
import BaseError from './BaseError.js';

export default class ValidationError extends BaseError {
  constructor(error) {
    super(error);

    this.error = {
      statusCode: httpStatus.BAD_REQUEST,
      message: messages.get('ERROR.VALIDATION.VALIDATION_ERROR'),
      errors: error.errors,
    };
  }
}
