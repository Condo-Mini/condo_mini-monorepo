import httpStatus from '../constants/httpStatus.js';
import BaseError from './BaseError.js';

export default class AddressError extends BaseError {
  constructor(error) {
    super(error);

    this.error.statusCode = error.statusCode || httpStatus.UNPROCESSABLE_ENTITY;
  }
}
