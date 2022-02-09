import CreateWorkflow from './CreateWorkflow';
import * as commonValidators from './commonValidators';

export default {
  workflows: {
    create: new CreateWorkflow().handler,
  },
  ...commonValidators,
};
