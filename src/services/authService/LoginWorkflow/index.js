import UserModel from '../../../models/UserModel';
import { validateLogin } from './validators';
import config from '../../../config';
import jwt from 'jsonwebtoken';
import BaseWorkflow from '../../BaseWorkflow';
import { parseMongooseObjectToObjectLiteral } from '../../../helpers/objectHelper';

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
    const { email, password } = input;
    const { jwtSecret } = config;

    const user = await UserModel.findOne({ 'subscription.email': email });

    const jwtConfig = { algorithm: 'HS256', expiresIn: '30m' };
    const jwtPayload = {
      user: {
        email,
        password,
        role: user.subscription.role,
        userId: user.id,
      },
    };

    const token = jwt.sign(jwtPayload, jwtSecret, jwtConfig);

    return {
      token,
    };
  };
}
