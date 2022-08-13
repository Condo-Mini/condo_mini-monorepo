import express from 'express';
import defaultController from '../../controllers/default/defaultController.js';
import Route from '../Route.js';

const router = express.Router();

const healthCheckEndpoint = new Route({
  url: 'health/check',
});
router.get(...healthCheckEndpoint.addStandardRouteMiddlewares(), defaultController.notImplemented);

export default router;
