import Controller from '../Controller';
import validationSchema from './authValidationSchema';
import authService from '../../services/authService';
import httpStatus from '../../constants/httpStatus';
import LoginDTO from './DTOs/LoginDTO';

const authController = {};

authController.login = new Controller()
  .addPre((req) => {
    const { error } = validationSchema.validate(req.body);

    if (error) {
      const { message } = error;

      throw new ValidationError({
        message,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }
  })
  .setEndpoint(
    async (req) => {
      const { email, password } = req.body;

      const loggedUser = await authService.workflows.login({ email, password });

      return loggedUser;
    },
    { successStatusCode: httpStatus.OK, DTOClass: LoginDTO }
  );

export default authController;
