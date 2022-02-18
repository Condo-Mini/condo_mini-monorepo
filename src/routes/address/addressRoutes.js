import express from 'express';
import Route from '../Route';
import { createByZipCodeValidationSchema } from './addressValidationSchemas';
import addressController from '../../controllers/address/addressController';

const router = express.Router();

const createByZipCodeEndpoint = new Route({
  url: 'address/byZipCode',
  validationSchema: createByZipCodeValidationSchema,
});
router.post(
  ...createByZipCodeEndpoint.addStandardRouteMiddlewares(),
  addressController.createByZipCode
);

export default router;
