import BaseError from './BaseError';

export default class ValidationError extends BaseError {
  constructor(error) {
    super(error);
  }
}
