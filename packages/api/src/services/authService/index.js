import LoginWorkflow from './LoginWorkflow/index.js';
import * as commons from './commons.js';

export default {
  workflows: {
    login: new LoginWorkflow().handler,
  },
  ...commons,
};
