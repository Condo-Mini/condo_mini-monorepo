import httpStatus from '../../../constants/httpStatus';
import AuthError from '../../../errors/AuthError';
import messages from '../../../messages';
import { validateEmailAndPassword } from '../../userService/commonValidators';

export const validateLogin = async ({ email, password }) => {
  try {
    await validateEmailAndPassword({ email, password });
  } catch (error) {
    throw new AuthError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.ERROR.AUTH.INVALID_EMAIL_OR_PASSWORD,
    });
  }
};
