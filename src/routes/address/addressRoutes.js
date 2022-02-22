import { createByZipCodeValidationSchema } from './addressValidationSchemas';
import addressController from '../../controllers/address/addressController';
import express from 'express';
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

export default router;
