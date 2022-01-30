import httpStatus from '../constants/httpStatus';
import AuthError from '../errors/AuthError';
import messages from '../messages';
import config from '../config';
import jwt from 'jsonwebtoken';

export default (req) => {
  const jwtToken = req.headers.authorization;
  const { jwtSecret } = config;

  if (!jwtToken) {
    throw new AuthError({
      statusCode: httpStatus.UNAUTHORIZED,
      message: messages.ERROR.AUTH.AUTH_HEADER_IS_MISSING,
    });
  }

  try {
    const { user: loggedUser } = jwt.verify(jwtToken, jwtSecret);

    req.loggedUser = loggedUser;
  } catch (error) {
    throw new AuthError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: error.message,
    });
  }
};
