import UserModel from '../../../models/user/UserModel';
import UserError from '../../../errors/UserError';
import messages from '../../../messages';

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
