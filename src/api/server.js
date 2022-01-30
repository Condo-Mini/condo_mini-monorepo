import config from '../config';
import mongoose from 'mongoose';
import app from './app';
import Database from '../database';

const startServer = () => {
  const port = config.apiPort || 8800;

  Database.connect();

  app.listen(port, () => {
    console.log(`HTTP Server listening on port: ${port}`);
  });
};

startServer();
