import mongoose from 'mongoose';
import auditSchema from '../schemas/auditSchema.js';
import addressCreationTypeEnum from './enums/addressCreationTypeEnum.js';

const { Schema } = mongoose;

export default new Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  areaCode: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  notes: {
    type: String,
  },
  updatableFields: {
    type: Array,
    required: true,
  },
  creationType: {
    type: String,
    required: true,
    enum: Object.values(addressCreationTypeEnum),
  },
  ...auditSchema,
});
