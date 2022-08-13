import NotImplementedError from '../../errors/NotImplementedError.js';
import Controller from '../Controller.js';

const defaultController = {};

defaultController.notImplemented = new Controller().setEndpoint(() => {
  throw new NotImplementedError();
});

export default defaultController;
