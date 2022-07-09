import BaseError from './BaseError';
import messages from '../messages';
import httpStatus from '../constants/httpStatus';

export default class RegExError extends BaseError {
  constructor(error) {
    super(error);

    this.error = {
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.get(
        'ERROR.REGEX.INVALID_EXPRESSION',
        error.expression,
        error.pattern
      ),
    };
  }
}
