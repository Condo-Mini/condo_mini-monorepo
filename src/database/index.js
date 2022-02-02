import mongoose from 'mongoose';
import config from '../config';
import { sanitizeSingleValueToArray } from '../helpers/arrayHelper';

export default class Database {
  static async connect(dbName = config.dbName) {
    let dbUri;
    let message;

    if (config.dbAtlas) {
      dbUri = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${dbName}?retryWrites=true&w=majority`;
      message = `Mongoose is connected to ${dbName} on Atlas!`;
    } else {
      dbUri = `mongodb://${config.dbHost}:${config.dbPort}/${dbName}`;
      message = `Mongoose is connected to ${dbName}!`;
    }

    return mongoose
      .connect(dbUri)
      .then(() => console.log(message))
      .catch(() => console.log('Fail to connect with Mongoose!'));
  }

  static configSchema({ schema, options }) {
    const newSchema = new mongoose.Schema(schema, options);

    newSchema.statics.findWith = async function findWith({
      excludedIds,
      ...params
    }) {
      return this.findOne({
        ...params,
        ...(excludedIds
          ? { id: { $nin: sanitizeSingleValueToArray(excludedIds) } }
          : {}),
      });
    };

    newSchema.statics.existsWith = async function existsWith({
      excludedIds,
      ...params
    }) {
      const document = await this.findOne({
        ...params,
        ...(excludedIds
          ? { id: { $nin: sanitizeSingleValueToArray(excludedIds) } }
          : {}),
      });

      return Boolean(document);
    };

    return newSchema;
  }
}