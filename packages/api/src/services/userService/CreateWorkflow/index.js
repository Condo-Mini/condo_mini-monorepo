import { encrypt } from '../../../helpers/cryptographyHelper';
import userRoleEnum from '../../../models/user/enums/userRoleEnum';
import UserModel from '../../../models/user/UserModel';
import { getPermissionInfoFromUserRole } from "../commons";
import BaseWorkflow from '../../BaseWorkflow';
import { validateUniqueEmailIndex } from './validators';

export default class CreateWorkflow extends BaseWorkflow {
  format = (rawInput) => ({
    firstName: rawInput.firstName,
    lastName: rawInput.lastName,
    email: rawInput.email,
    password: rawInput.password,
    role: rawInput.role || userRoleEnum.RESIDENT,
    loggedUser: rawInput.loggedUser,
  });

  validate = async (input) => {
    const { email } = input;

    await validateUniqueEmailIndex(email);
  };

  process = async (input) => {
    const { firstName, lastName, email, password, role, loggedUser } = input;

    const user = new UserModel({
      firstName,
      lastName,
      profile: {
        email,
        password: encrypt(password),
        permission: {
          ...getPermissionInfoFromUserRole(role),
        },
      },
      createdBy: loggedUser.id,
      createdAt: new Date(),
    });

    await user.save();
    return user;
  };
}
