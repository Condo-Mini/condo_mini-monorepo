import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes';
import errorHandler from '../middlewares/errorHandler';

const app = express();
const { healthCheck, authRoutes, addressRoutes, userRoutes } = routes;

app.use(bodyParser.json());

app.use('/health', healthCheck);

app.use('/auth', authRoutes);
app.use('/address', addressRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

export default app;
