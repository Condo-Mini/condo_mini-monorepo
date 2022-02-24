import CreateByZipCodeWorkflow from './CreateByZipCodeWorkflow';

export default {
  workflows: {
    createByZipCode: new CreateByZipCodeWorkflow().handler,
    createByAddress: new CreateByZipCodeWorkflow().handler,
  },
};
