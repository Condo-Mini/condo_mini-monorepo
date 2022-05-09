import Controller from '../Controller';
import userService from '../../services/userService';
import httpStatus from '../../constants/httpStatus';
import UserDTO from './DTOs/UserDTO';
import userRoleEnum from '../../models/user/enums/userRoleEnum';
import User from '../../core/entities/user/User';

const userController = {};

userController.create = new Controller()
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

userController.getById = new Controller()
  .addStandardMiddlewares((req) => {
    req.permissionRole = userRoleEnum.RESIDENT;
  })
  .setEndpoint(
    async (req) => {
      const { params } = req;

      const user = await userService.workflows.getById({ ...params });

      return user;
    },
    { successStatusCode: httpStatus.OK, DTOClass: UserDTO }
  );

userController.getTsUser = new Controller().setEndpoint(async () => {
  const user = new User({
    name: 'Matheus',
    lastName: 'Martino',
    age: 25,
  });

  return user.getFullName();
});

export default userController;
