import express from 'express';
import { createByZipCodeValidationSchema, createAddressValidationSchema } from './addressValidationSchemas';
import addressController from '../../controllers/address/addressController';
import Route from '../Route';
import defaultController from '../../controllers/default/defaultController';

const router = express.Router();

const createByZipCodeEndpoint = new Route({
  url: 'address/zipCode',
  validationSchema: createByZipCodeValidationSchema,
});
router.post(
  ...createByZipCodeEndpoint.addStandardRouteMiddlewares(),
  addressController.createByZipCode
);

const createAddressEndpoint = new Route({
  url: 'address/',
  validationSchema: createAddressValidationSchema,
});
router.post(
  ...createAddressEndpoint.addStandardRouteMiddlewares(),
  defaultController.notImplemented
);

export default router;
