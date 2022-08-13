import express from 'express';
import defaultController from '../../controllers/default/defaultController.js';
import Route from '../Route.js';
import myFunction from 'geolocation';

const router = express.Router();

const healthCheckEndpoint = new Route({
  url: 'health/check',
});
router.get(...healthCheckEndpoint.addStandardRouteMiddlewares(), (_, res) => res.send(myFunction()));

export default router;
