export default class BaseError {
  constructor(error) {
    this.error = {
      message: error.message,
      statusCode: error.statusCode,
    };
  }
}
