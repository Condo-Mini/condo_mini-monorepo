import httpStatus from '../constants/httpStatus';
import BaseError from './BaseError';

export default class UserError extends BaseError {
  constructor(error) {
    super(error);

    this.error.statusCode = error.statusCode || httpStatus.UNPROCESSABLE_ENTITY;
  }
}
