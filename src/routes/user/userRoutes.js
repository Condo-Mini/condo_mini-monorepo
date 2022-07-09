import express from 'express';
import userController from '../../controllers/user/userController';
import { createUserValidationSchema, getUserValidationSchema } from './userValidationSchemas';
import Route from '../Route';

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
