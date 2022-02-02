import mongoose from 'mongoose';
import Database from '../database';
import schema from './schemas/userSchema';

const userSchema = Database.configSchema({
  schema,
  options: {
    read: 'primary',
    toJSON: { getters: true, virtuals: true, versionKey: false },
    toObject: { getters: true, virtuals: true, versionKey: false },
    id: true,
  },
});

userSchema.index({ 'profile.email': 1 }, { unique: true });

export default mongoose.model('user', userSchema);
