import { Schema } from 'mongoose';
import auditSchema from '../schemas/auditSchema';

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
  ...auditSchema,
});
