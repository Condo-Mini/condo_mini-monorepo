import mongoose from 'mongoose';
import { userRoleEnum } from '../enums/userEnums';
import auditSchema from './auditSchema';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export default new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String
  },
  subscription: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(userRoleEnum),
      default: userRoleEnum.RESIDENT,
    },
  },
  address: {
    type: ObjectId,
    // required: true,
    ref: 'address',
  },
  ...auditSchema,
});
