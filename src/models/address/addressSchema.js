import { Schema } from 'mongoose';
import auditSchema from '../schemas/auditSchema';

export default new Schema({
  country: {
    type: String,
    required: true,
  },
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
  ...auditSchema,
});
