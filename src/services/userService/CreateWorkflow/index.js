import md5 from 'md5';
import { userRoleEnum } from '../../../models/enums/userEnums';
import UserModel from '../../../models/UserModel';
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
    const { firstName, lastName, email, password, role } = input;

    const user = new UserModel({
      firstName,
      lastName,
      subscription: {
        email,
        password: md5(password),
        role,
      },
    });

    await user.save();
    return user;
  };
}
