import UserModel from '../../../models/user/UserModel.js';
import { validateLogin } from './validators.js';
import BaseWorkflow from '../../BaseWorkflow.js';
import { sign } from '../commons.js';
import timeConstants from '../../../constants/timeConstants.js';

export default class LoginWorkflow extends BaseWorkflow {
  format = (rawInput) => ({
    email: rawInput.email,
    password: rawInput.password,
  });

  validate = async (input) => {
    const { email, password } = input;

    await validateLogin({ email, password });
  };

  process = async (input) => {
    const { email } = input;

    const user = await UserModel.findOne({ 'profile.email': email });

    const expiresIn = 30 * timeConstants.SECONDS_PER_MINUTE;
    const jwtPayload = {
      user: {
        id: user.id,
        email,
        permission: {
          role: user.profile.permission.role,
          level: user.profile.permission.level,
        },
      },
    };

    const token = sign({ jwtPayload, expiration: expiresIn });

    return {
      token,
    };
  };
}
