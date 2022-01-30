import { Schema } from 'mongoose';
import auditSchema from './auditSchema';

export default new Schema({
  street: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  ...auditSchema
})