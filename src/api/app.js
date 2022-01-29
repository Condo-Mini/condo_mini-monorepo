import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes';

const app = express();
const { healthCheck } = routes;

app.use(bodyParser.json());

app.use('/health', healthCheck);

export default app;
