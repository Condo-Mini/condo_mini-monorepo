import GetByZipCodeWorkflow from './GetByZipCodeWorkflow';

export default {
  workflows: {
    getByZipCode: new GetByZipCodeWorkflow().handler,
  },
};
