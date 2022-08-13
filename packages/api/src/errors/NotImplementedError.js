import httpStatus from '../constants/httpStatus.js';

export default class NotImplementedError {
  constructor() {
    this.error = {
      message: 'Not implemented',
      statusCode: httpStatus.NOT_IMPLEMENTED,
    };
  }
}
