import express from 'express';
import { createByZipCodeValidationSchema, createAddressValidationSchema } from './addressValidationSchemas';
import addressController from '../../controllers/address/addressController';
import Route from '../Route';

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
  addressController.create
);

export default router;
