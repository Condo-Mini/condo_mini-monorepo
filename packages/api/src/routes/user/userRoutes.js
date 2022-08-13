import express from 'express';
import userController from '../../controllers/user/userController.js';
import { createUserValidationSchema, getUserValidationSchema } from './userValidationSchemas.js';
import Route from '../Route.js';

const router = express.Router();

const createUserEndpoint = new Route({
  url: 'user/',
  validationSchema: createUserValidationSchema,
});
router.post(...createUserEndpoint.addStandardRouteMiddlewares(), userController.create);

const getUserEndpoint = new Route({
  url: 'user/:id',
  validationSchema: getUserValidationSchema,
});
router.get(...getUserEndpoint.addStandardRouteMiddlewares(), userController.getById);

const listUsersEndpoint = new Route({
  url: 'user/',
});
router.get(...listUsersEndpoint.addStandardRouteMiddlewares(), userController.list);

export default router;
