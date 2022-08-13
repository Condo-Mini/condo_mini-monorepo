import CreateByZipCodeWorkflow from './CreateByZipCodeWorkflow/index.js';

export default {
  workflows: {
    createByZipCode: new CreateByZipCodeWorkflow().handler,
  },
};
