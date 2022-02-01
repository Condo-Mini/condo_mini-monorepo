import request from 'supertest';
import parallel from 'mocha.parallel';
import chai from 'chai';
import loaders from '../../src/loaders';
import express from 'express';
import config from '../../src/config';
import mongoose from 'mongoose';

const ensureEnvironment = () => {
  if (config.nodeEnv !== 'test') {
    throw new Error("Tests cannot run on an environment other than 'test'.");
  }
};

const setUpChai = () => {
  global.expect = chai.expect;
  global.assert = chai.assert;
  global.should = chai.should();
};

const setUpApp = () => {
  const app = express();

  loaders.express.init(app);

  global.agent = request.agent(app);
  global.parallel = parallel;
};

before('Init', async () => {
  ensureEnvironment();
  const dbName = process.env.TEST_DB_NAME || 'condominidb_test';

  config.dbName = dbName;
  await loaders.mongoose.init(dbName);

  const modelCollectionArray = await mongoose.connection.db
    .listCollections()
    .toArray();

  await Promise.all(
    modelCollectionArray.map(async (collection) =>
      mongoose.connection.db.collection(collection.name).deleteMany()
    )
  );

  setUpChai();
  setUpApp();
});

after('Finish', async () => {
  const modelCollectionArray = await mongoose.connection.db
    .listCollections()
    .toArray();

  await Promise.all(
    modelCollectionArray.map(async (collection) =>
      mongoose.connection.db.collection(collection.name).deleteMany()
    )
  );
});
