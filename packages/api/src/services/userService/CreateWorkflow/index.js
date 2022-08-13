import { encrypt } from '../../../helpers/cryptographyHelper.js';
import userRoleEnum from '../../../models/user/enums/userRoleEnum.js';
import UserModel from '../../../models/user/UserModel.js';
import { getPermissionInfoFromUserRole } from '../commons.js';
import BaseWorkflow from '../../BaseWorkflow.js';
import { validateUniqueEmailIndex } from './validators.js';

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
