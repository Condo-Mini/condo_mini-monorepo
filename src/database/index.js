import mongoose from 'mongoose';
import { sanitizeSingleValueToArray } from '../helpers/arrayHelper';

export default class Database {
  static configSchema({ schema, options }) {
    const newSchema = new mongoose.Schema(schema, options);

    newSchema.statics.findWith = async function findWith({ excludedIds, ...params }) {
      return this.findOne({
        ...params,
        ...(excludedIds
          ? { id: { $nin: sanitizeSingleValueToArray(excludedIds) } }
          : {}),
      });
    };

    newSchema.statics.existsWith = async function existsWith({ excludedIds, ...params }) {
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
