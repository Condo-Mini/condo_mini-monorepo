import BaseError from './BaseError';

export default class UserError extends BaseError {
  constructor(error) {
    super(error);
  }
}
