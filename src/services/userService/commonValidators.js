import httpStatus from '../../constants/httpStatus';
import UserError from '../../errors/UserError';
import { compare } from '../../helpers/cryptographyHelper';
import messages from '../../messages';
import UserModel from '../../models/user/UserModel';

export const validateEmailAndPassword = async ({ email, password }) => {
  const user = await UserModel.findWith({ 'profile.email': email });

  if (!user) {
    throw new UserError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.get('ERROR.USER.EMAIL_IS_NOT_REGISTERED'),
    });
  }

  if (!compare(password, user.profile.password)) {
    throw new UserError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.get('ERROR.USER.INVALID_PASSWORD'),
    });
  }
};
