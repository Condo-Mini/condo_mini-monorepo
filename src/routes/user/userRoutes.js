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

const getUserEndPoint = new Route({
  url: 'user/:id',
  validationSchema: getUserValidationSchema,
});
router.get(...getUserEndPoint.addStandardRouteMiddlewares(), userController.getById);

const getTsUser = new Route({
  url: 'user/',
});
router.get(...getTsUser.addStandardRouteMiddlewares(), userController.getTsUser);

export default router;
