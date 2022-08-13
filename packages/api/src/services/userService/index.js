import CreateWorkflow from './CreateWorkflow';
import GetByIdWorkflow from './GetByIdWorkflow';
import * as commons from './commons';
import * as commonValidators from './commonValidators';

export default {
  workflows: {
    create: new CreateWorkflow().handler,
    getById: new GetByIdWorkflow().handler,
  },
  ...commons,
  ...commonValidators,
};
