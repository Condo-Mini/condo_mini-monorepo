import UserModel from '../../../models/user/UserModel.js';
import UserError from '../../../errors/UserError.js';
import messages from '../../../messages/index.js';

export const validateUniqueEmailIndex = async (email) => {
  const isEmailAlreadyRegistered = await UserModel.existsWith({
    'profile.email': email,
  });

  if (isEmailAlreadyRegistered) {
    throw new UserError({
      message: messages.get('ERROR.USER.EMAIL_ALREADY_REGISTERED'),
    });
  }
};
