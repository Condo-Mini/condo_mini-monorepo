import express from 'express';
import Route from '../Route.js';
import geolocation from 'geolocation';

const router = express.Router();

const healthCheckEndpoint = new Route({
  url: 'health/check',
});
router.get(...healthCheckEndpoint.addStandardRouteMiddlewares(), (_, res) => {
  res.json({
    healthChecks: {
      geolocation: geolocation.healthCheck(),
    },
  });
});

export default router;
