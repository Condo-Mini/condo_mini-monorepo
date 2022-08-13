import UserError from '../../errors/UserError.js';
import { compare } from '../../helpers/cryptographyHelper.js';
import messages from '../../messages/index.js';
import UserModel from '../../models/user/UserModel.js';

export const validateEmailAndPassword = async ({ email, password }) => {
  const user = await UserModel.findWith({ 'profile.email': email });

  if (!user) {
    throw new UserError({
      message: messages.get('ERROR.USER.EMAIL_IS_NOT_REGISTERED'),
    });
  }

  if (!compare(password, user.profile.password)) {
    throw new UserError({
      message: messages.get('ERROR.USER.INVALID_PASSWORD'),
    });
  }
};
