import CreateWorkflow from './CreateWorkflow/index.js';
import GetByIdWorkflow from './GetByIdWorkflow/index.js';
import * as commons from './commons.js';
import * as commonValidators from './commonValidators.js';

export default {
  workflows: {
    create: new CreateWorkflow().handler,
    getById: new GetByIdWorkflow().handler,
  },
  ...commons,
  ...commonValidators,
};
