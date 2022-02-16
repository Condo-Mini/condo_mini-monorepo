import express from 'express';
import userController from '../../controllers/user/userController';
import { createUserValidationSchema } from './userValidationSchemas';
import Route from '../Route';

const router = express.Router();

const createUserEndpoint = new Route({
  url: 'user/',
  validationSchema: createUserValidationSchema,
});
router.post(
  ...createUserEndpoint.addStandardRouteMiddlewares(),
  userController.create
);

export default router;
