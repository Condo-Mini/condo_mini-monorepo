import BaseError from './BaseError';

export default class AuthError extends BaseError {
  constructor(error) {
    super(error);
  }
}
