import express from 'express';
import authController from '../../controllers/auth/authController.js';
import { loginValidationSchema } from './authValidationSchema.js';
import Route from '../Route.js';

const router = express.Router();

const loginEndpoint = new Route({
  url: 'auth/login/',
  validationSchema: loginValidationSchema,
});
router.post(...loginEndpoint.addStandardRouteMiddlewares(), authController.login);

export default router;
