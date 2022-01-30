import LoginWorkflow from './LoginWorkflow';
import * as commons from './commons';

export default {
  workflows: {
    login: new LoginWorkflow().handler,
  },
  ...commons,
};
