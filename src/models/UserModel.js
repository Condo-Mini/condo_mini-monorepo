import mongoose from 'mongoose';
import schema from './schemas/userShema';

const userSchema = new mongoose.Schema(schema, {
  read: 'primary',
  toJSON: { getters: true, virtuals: true, versionKey: false },
  toObject: { getters: true, virtuals: true, versionKey: false },
  id: true
});

export default mongoose.model('User', userSchema);
