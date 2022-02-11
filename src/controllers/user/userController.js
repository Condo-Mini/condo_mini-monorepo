import Controller from '../Controller';
import userService from '../../services/userService';
import httpStatus from '../../constants/httpStatus';
import UserDTO from './DTOs/UserDTO';
import validationSchema from './userValidationSchema';
import userRoleEnum from '../../models/user/enums/userRoleEnum';

const userController = {};

userController.create = new Controller({ validationSchema })
  .addStandardMiddlewares((req) => {
    req.permissionRole = userRoleEnum.GUARD;
  })
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
