import config from '../config';
import mongoose from 'mongoose';
import app from './app'

const { apiPort, dbPort, dbHost, dbName } = config

const startServer = () => {
  const port = apiPort || 8800;

  mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)

  app.listen(port, () => {
    console.log(`HTTP Server listening on port: ${port}`);
  });
};

startServer();
