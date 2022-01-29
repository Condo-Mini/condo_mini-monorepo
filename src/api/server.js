import app from './app';
import config from '../config';

const startServer = () => {
  const port = config.port || 8800;

  app.listen(port, () => {
    console.log(`HTTP Server listening on port: ${port}`);
  });
};

startServer();
