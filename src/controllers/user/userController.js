import Controller from '../Controller';
import userService from '../../services/userService';
import httpStatus from '../../constants/httpStatus';
import UserDTO from './DTOs/UserDTO';
import validationSchema from './userValidationSchema';

const userController = {};

userController.create = new Controller({ validationSchema })
  .addStandardMiddlewares()
  .setEndpoint(
    async (req) => {
      const { firstName, lastName, email, password, role } = req.body;

      const user = await userService.workflows.create({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      return user;
    },
    { successStatusCode: httpStatus.CREATED, DTOClass: UserDTO }
  );

export default userController;
