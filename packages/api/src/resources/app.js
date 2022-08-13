import express from 'express';
import routes from '../routes';
import loaders from '../loaders';
import errorHandler from '../middlewares/errorHandler';

const app = express();
const { healthCheck, authRoutes, addressRoutes, userRoutes } = routes;

loaders.express.init(app);

app.use('/health', healthCheck);

app.use('/auth', authRoutes);
app.use('/address', addressRoutes);
app.use('/user', userRoutes);

app.get('/', (_, res) => res.json('Welcome to the Condomini API!'));

app.use(errorHandler);

export default app;
