import Controller from '../Controller';
import userService from '../../services/userService';
import httpStatus from '../../constants/httpStatus';
import UserDTO from './DTOs/UserDTO';
import validationSchema from './userValidationSchema';
import authToken from '../../middlewares/authToken';

const userController = {};

userController.create = new Controller()
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
  .addPre(authToken)
  .setEndpoint(
    async (req) => {
      const { firstName, lastName, email, password, role } = req.body;
      const { loggedUser } = req;

      const user = await userService.workflows.create({
        firstName,
        lastName,
        email,
        password,
        role,
        loggedUser,
      });

      return user;
    },
    { successStatusCode: httpStatus.CREATED, DTOClass: UserDTO }
  );

export default userController;
