import mongoose from 'mongoose';
import Database from '../../database';
import schema from './addressSchema';

const addressSchema = Database.configSchema({
  schema,
  options: {
    read: 'primary',
    toJSON: { getters: true, virtuals: true, versionKey: false },
    toObject: { getters: true, virtuals: true, versionKey: false },
    id: true,
  },
});

addressSchema.index({ street: 1, number: 1, zipCode: 1 }, { unique: true });

export default mongoose.model('address', addressSchema);
