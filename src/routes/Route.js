import rescue from 'express-rescue';
import ValidationError from '../errors/ValidationError';

export default class Route {
  constructor(route) {
    this.url = route.url;
    this.validationSchema = route.validationSchema;
  }

  getPartialUrl() {
    const [_entity, ...partial] = this.url.split('/');

    return `/${partial.join('/')}`;
  }

  addValidationMiddleware() {
    return rescue((req, _res, next) => {
      const validationErrors = {};

      Object.entries(this.validationSchema).forEach(([location, schema]) => {
        if (!req[location]) {
          throw new Error(`Invalid schema location: ${location}`);
        }
        const { error } = schema.validate(req[location], {
          abortEarly: false,
        });

        if (error?.details) {
          validationErrors[location] = error.details.map(
            ({ message, path, context: { value } }) => ({
              message,
              path: path[0],
              ...(value ? { value } : {}),
            })
          );
        }
      });

      if (Object.keys(validationErrors).length) {
        throw new ValidationError({
          errors: validationErrors,
        });
      }

      next();
    });
  }

  addStandardRouteMiddlewares() {
    return [
      this.getPartialUrl(),
      ...(this.validationSchema ? [this.addValidationMiddleware()] : []),
    ];
  }
}
