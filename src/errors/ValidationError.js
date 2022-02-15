import httpStatus from '../constants/httpStatus';
import messages from '../messages';
import BaseError from './BaseError';

export default class ValidationError extends BaseError {
  constructor(error) {
    super(error);

    this.error = {
      statusCode: httpStatus.BAD_REQUEST,
      message: messages.ERROR.VALIDATION.VALIDATION_ERROR,
      errors: error.errors,
    };
  }
}
