import express from 'express';
import { createByZipCodeValidationSchema } from './addressValidationSchemas.js';
import addressController from '../../controllers/address/addressController.js';
import Route from '../Route.js';

const router = express.Router();

const createByZipCodeEndpoint = new Route({
  url: 'address/zipCode',
  validationSchema: createByZipCodeValidationSchema,
});
router.post(...createByZipCodeEndpoint.addStandardRouteMiddlewares(), addressController.createByZipCode);

export default router;
