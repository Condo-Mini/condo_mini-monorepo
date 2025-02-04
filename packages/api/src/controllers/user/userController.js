import Controller from '../Controller.js';
import userService from '../../services/userService/index.js';
import httpStatus from '../../constants/httpStatus.js';
import UserDTO from './DTOs/UserDTO.js';
import userRoleEnum from '../../models/user/enums/userRoleEnum.js';
import UserModel from '../../models/user/UserModel.js';

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

userController.list = new Controller().setEndpoint(
  async () => {
    const users = await UserModel.find().limit(20);

    return users;
  },
  { successStatusCode: httpStatus.OK, DTOClass: UserDTO }
);

export default userController;
