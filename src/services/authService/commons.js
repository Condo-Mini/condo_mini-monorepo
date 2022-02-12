import jwt from 'jsonwebtoken';
import UserModel from '../../models/user/UserModel';
import AuthError from '../../errors/AuthError';
import httpStatus from '../../constants/httpStatus';
import messages from '../../messages';
import config from '../../config';

export const sign = ({ jwtPayload, expiration: expirationInSeconds }) => {
  const { jwtSecret } = config;
  const jwtConfig = { algorithm: 'HS256', expiresIn: expirationInSeconds };

  return jwt.sign(jwtPayload, jwtSecret, jwtConfig);
};

export const verifyTokenAndExtractUser = async ({ jwtToken, jwtSecret }) => {
  if (!jwtToken) {
    throw new AuthError({
      statusCode: httpStatus.UNAUTHORIZED,
      message: messages.ERROR.AUTH.AUTH_HEADER_IS_MISSING,
    });
  }

  try {
    const { user } = jwt.verify(jwtToken, jwtSecret);

    const loggedUser = await UserModel.findById(user.id);

    return loggedUser;
  } catch (error) {
    throw new AuthError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: error.message,
    });
  }
};
