import Controller from '../Controller.js';
import authService from '../../services/authService/index.js';
import httpStatus from '../../constants/httpStatus.js';
import LoginDTO from './DTOs/LoginDTO.js';

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
