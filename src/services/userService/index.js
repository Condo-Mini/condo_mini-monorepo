import CreateWorkflow from './CreateWorkflow';

export default {
  workflows: {
    create: new CreateWorkflow().handler,
  },
};
