import config from '../config';
import app from './app';
import loaders from '../loaders';

const startServer = () => {
  const port = config.apiPort || 8800;

  loaders.mongoose.init();

  app.listen(port, () => {
    console.log(`HTTP Server listening on port: ${port}`);
  });
};

startServer();
