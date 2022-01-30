import rescue from 'express-rescue';
import httpStatus from '../constants/httpStatus';
import ValidationError from '../errors/ValidationError';
import authToken from '../middlewares/authToken';

export default class Controller {
  constructor({ validationSchema } = {}) {
    this.validationSchema = validationSchema;
  }

  _preMiddlewares = [];

  _endpoint() {}

  _build = () => {
    const pipeline = [...this._preMiddlewares, this._endpoint];

    return pipeline.map(rescue);
  };

  addPre(middleware) {
    this._preMiddlewares.push((req, res, next) => {
      middleware(req, res);
      next();
    });

    return this;
  }

  addStandardMiddlewares() {
    this.addPre((req) => {
      const { error } = this.validationSchema.validate(req.body);

      if (error) {
        const { message } = error;

        throw new ValidationError({
          message,
          statusCode: httpStatus.BAD_REQUEST,
        });
      }
    });

    this.addPre(authToken);

    return this;
  }

  setEndpoint(endpoint, { successStatusCode, DTOClass }) {
    this._endpoint = async (req, res) => {
      const endpointResponse = await endpoint(req, res);
      const responseWithDTO = new DTOClass(endpointResponse);

      return res.status(successStatusCode).json(responseWithDTO);
    };

    return this._build();
  }
}
