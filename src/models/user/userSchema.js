import mongoose from 'mongoose';
import userRoleEnum from './enums/userRoleEnum';
import auditSchema from '../schemas/auditSchema';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export default new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  profile: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    permission: {
      role: {
        type: String,
        required: true,
        enum: Object.values(userRoleEnum),
      },
      level: {
        type: String,
        required: true,
      },
    },
  },
  address: {
    type: ObjectId,
    // required: true,
    ref: 'address',
  },
  ...auditSchema,
});
