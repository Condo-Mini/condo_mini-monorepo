import BaseError from './BaseError';
import messages from '../messages';
import httpStatus from '../constants/httpStatus';

export default class RegExError extends BaseError {
  constructor(error) {
    super(error);

    this.statusCode = httpStatus.UNPROCESSABLE_ENTITY;
    this.message = messages.get(
      'ERROR.REGEX.INVALID',
      error.expression,
      error.pattern
    );
  }
}
