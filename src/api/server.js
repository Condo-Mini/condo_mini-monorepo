import config from '../config';
import mongoose from 'mongoose';
import app from './app'

const { dbHost, dbName } = config

const startServer = () => {
  const port = config.port || 8800;

  mongoose.connect(`mongodb://${dbHost}/${dbName}`)

  app.listen(port, () => {
    console.log(`HTTP Server listening on port: ${port}`);
  });
};

startServer();
