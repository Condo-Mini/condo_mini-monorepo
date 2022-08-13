import BaseWorkflow from '../../BaseWorkflow.js';
import { findByIdAndValidateIfExists } from '../commons.js';

export default class GetByIdWorkflow extends BaseWorkflow {
  format = (rawInput) => ({
    userId: rawInput.id,
  });

  validate = (t) => t;

  process = async (input) => {
    const { userId } = input;

    return findByIdAndValidateIfExists(userId);
  };
}
