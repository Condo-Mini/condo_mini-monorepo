import GetByZipCodeWorkflow from './GetByZipCodeWorkflow/index.js';

export default {
  workflows: {
    getByZipCode: new GetByZipCodeWorkflow().handler,
  },
};
