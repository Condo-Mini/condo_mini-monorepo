import CreateWorkflow from './CreateWorkflow';
import * as commons from './commons';
import * as commonValidators from './commonValidators';

export default {
  workflows: {
    create: new CreateWorkflow().handler,
  },
  ...commons,
  ...commonValidators,
};
