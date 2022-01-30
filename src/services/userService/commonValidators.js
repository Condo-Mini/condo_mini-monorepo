import md5 from 'md5';
import httpStatus from '../../constants/httpStatus';
import UserError from '../../errors/UserError';
import messages from '../../messages';
import UserModel from '../../models/UserModel';

export const validateIfEmailIsRegistered = async (email) => {
  const isEmailRegistered = await UserModel.existsWith({
    'subscription.email': email,
  });

  if (!isEmailRegistered) {
    throw new UserError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.ERROR.USER.EMAIL_IS_NOT_REGISTERED,
    });
  }
};

export const validateEmailAndPassword = async ({ email, password }) => {
  await validateIfEmailIsRegistered(email);

  const user = await UserModel.findWith({ 'subscription.email': email });

  if (user.subscription.password !== md5(password)) {
    throw new UserError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.ERROR.USER.INVALID_PASSWORD,
    });
  }
};
