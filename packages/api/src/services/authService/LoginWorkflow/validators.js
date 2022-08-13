import httpStatus from '../../../constants/httpStatus.js';
import AuthError from '../../../errors/AuthError.js';
import messages from '../../../messages/index.js';
import userService from '../../userService/index.js';

export const validateLogin = async ({ email, password }) => {
  try {
    await userService.validateEmailAndPassword({ email, password });
  } catch (error) {
    throw new AuthError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.get('ERROR.AUTH.INVALID_EMAIL_OR_PASSWORD'),
    });
  }
};
