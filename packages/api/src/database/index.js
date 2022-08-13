import mongoose from 'mongoose';
import config from '../config/index.js';
import { sanitizeSingleValueToArray } from '../helpers/arrayHelper.js';

export default class Database {
  static async connect(dbName = config.dbName) {
    let dbUri;
    let message;

    if (config.dbAtlas) {
      dbUri = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${dbName}?retryWrites=true&w=majority`;
      message = `Server is connected to ${dbName} on Atlas!`;
    } else {
      dbUri = `mongodb://${config.dbHost}:${config.dbPort}/${dbName}`;
      message = `Server is connected to ${dbName} on port ${config.dbPort}!`;
    }

    return mongoose
      .connect(dbUri)
      .then(() => console.log(message))
      .catch((error) =>
        console.error(`
Fail to connect to ${dbName} database!
${error.message}`)
      );
  }

  static configSchema({ schema, options }) {
    const newSchema = new mongoose.Schema(schema, options);

    newSchema.statics.findWith = async function findWith({ excludedIds, ...params }) {
      return this.findOne({
        ...params,
        ...(excludedIds ? { id: { $nin: sanitizeSingleValueToArray(excludedIds) } } : {}),
      });
    };

    newSchema.statics.existsWith = async function existsWith({ excludedIds, ...params }) {
      const document = await this.findOne({
        ...params,
        ...(excludedIds ? { id: { $nin: sanitizeSingleValueToArray(excludedIds) } } : {}),
      });

      return Boolean(document);
    };

    return newSchema;
  }
}
