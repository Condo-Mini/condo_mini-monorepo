import startServer from './resources/server';
import app from './resources/app';
import config from './config';

const port = config.apiPort || 3000;

startServer(app, port)
  .then(() => console.log(`HTTP Server listening on port: ${port}`))
  .catch((error) =>
    console.error(`Fail to connect with Express!
${error.message}`)
  );
