import httpStatus from '../../../constants/httpStatus';
import AuthError from '../../../errors/AuthError';
import messages from '../../../messages';
import userService from '../../userService';

export const validateLogin = async ({ email, password }) => {
  try {
    await userService.validateEmailAndPassword({ email, password });
  } catch (error) {
    throw new AuthError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.ERROR.AUTH.INVALID_EMAIL_OR_PASSWORD,
    });
  }
};
