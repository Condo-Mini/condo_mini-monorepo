import express from 'express';
import authController from '../controllers/auth/authController';
import { loginValidationSchema } from '../controllers/auth/authValidationSchema';
import Route from './Route';

const router = express.Router();

const loginEndpoint = new Route({
  url: 'auth/login/',
  validationSchema: loginValidationSchema,
});
router.post(
  ...loginEndpoint.addStandardRouteMiddlewares(),
  authController.login
);

export default router;
