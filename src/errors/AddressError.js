import httpStatus from '../constants/httpStatus';
import BaseError from './BaseError';

export default class AddressError extends BaseError {
  constructor(error) {
    super(error);

    this.error.statusCode = httpStatus.UNPROCESSABLE_ENTITY;
  }
}
