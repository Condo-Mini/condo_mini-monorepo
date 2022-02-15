import rescue from 'express-rescue';
import ValidationError from '../errors/ValidationError';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import permissionMiddleware from '../middlewares/permissionMiddleware';

export default class Controller {
  constructor(validationSchema) {
    if (validationSchema) {
      this.validationSchema = validationSchema;
    }
  }

  _preMiddlewares = [];

  _endpoint() {}

  _build = () => {
    const pipeline = [...this._preMiddlewares, this._endpoint];

    return pipeline.map(rescue);
  };

  addPre(middleware) {
    this._preMiddlewares.push(async (req, res, next) => {
      await middleware(req, res);
      next();
    });

    return this;
  }

  addStandardMiddlewares(injectPermissionLevelMiddleware) {
    this.addPre(authenticationMiddleware);
    this.addPre(injectPermissionLevelMiddleware);
    this.addPre(permissionMiddleware);

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
