import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export default {
  createdBy: {
    type: ObjectId,
    ref: 'user',
    // required: true
  },
  updatedBy: {
    type: ObjectId,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
};
