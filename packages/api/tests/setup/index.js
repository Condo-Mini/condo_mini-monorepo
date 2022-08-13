import request from 'supertest';
import mongoose from 'mongoose';
import parallel from 'mocha.parallel';
import chai from 'chai';
import express from 'express';
import loaders from '../../src/loaders';
import config from '../../src/config';
import startServer from '../../src/resources/server';
import { ensureEnvironment } from '../../src/helpers/databaseHelper';

const setUpChai = () => {
  global.expect = chai.expect;
  global.assert = chai.assert;
  global.should = chai.should();
};

const setUpApp = async () => {
  const app = express();
  const port = process.env.PORT;

  loaders.express.init(app);

  global.agent = request.agent(app);
  global.parallel = parallel;

  startServer(app, port);
};

before('Init', async () => {
  ensureEnvironment({
    allowedEnvs: ['test', 'staging'],
    env: config.nodeEnv,
  });
  const dbName = process.env.TEST_DB_NAME || 'condominidb_test';

  config.dbName = dbName;
  await loaders.mongoose.init(dbName);

  const modelCollectionArray = await mongoose.connection.db.listCollections().toArray();

  await Promise.all(
    modelCollectionArray.map(async (collection) => mongoose.connection.db.collection(collection.name).deleteMany())
  );

  setUpChai();
  await setUpApp();
});

after('Finish', async () => {
  const modelCollectionArray = await mongoose.connection.db.listCollections().toArray();

  await Promise.all(
    modelCollectionArray.map(async (collection) => mongoose.connection.db.collection(collection.name).deleteMany())
  );
});
