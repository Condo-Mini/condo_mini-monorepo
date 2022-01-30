import LoginWorkflow from './LoginWorkflow';

export default {
  workflows: {
    login: new LoginWorkflow().handler,
  },
};
