import httpStatus from '../../../constants/httpStatus';
import UserError from '../../../errors/UserError';
import messages from '../../../messages';
import UserModel from '../../../models/UserModel';

export const validateUniqueEmailIndex = async (email) => {
  const isEmailAlreadyRegistered = await UserModel.existsWith({
    'subscription.email': email,
  });

  if (isEmailAlreadyRegistered) {
    throw new UserError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.ERROR.USER.EMAIL_ALREADY_REGISTERED,
    });
  }
};
