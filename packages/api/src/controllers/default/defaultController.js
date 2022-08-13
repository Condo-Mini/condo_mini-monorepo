import NotImplementedError from '../../errors/NotImplementedError';
import Controller from '../Controller';

const defaultController = {};

defaultController.notImplemented = new Controller().setEndpoint(() => {
  throw new NotImplementedError();
});

export default defaultController;
