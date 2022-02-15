import Controller from '../Controller';
import authService from '../../services/authService';
import httpStatus from '../../constants/httpStatus';
import LoginDTO from './DTOs/LoginDTO';

const authController = {};

authController.login = new Controller().setEndpoint(
  async (req) => {
    const { email, password } = req.body;

    const loggedUser = await authService.workflows.login({ email, password });

    return loggedUser;
  },
  { successStatusCode: httpStatus.OK, DTOClass: LoginDTO }
);

export default authController;
