import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes';

const app = express();
const { healthCheck, userRoutes } = routes;

app.use(bodyParser.json());

app.use('/health', healthCheck);

app.use('/user', userRoutes)

export default app;
