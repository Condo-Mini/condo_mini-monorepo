import httpStatus from '../constants/httpStatus';
import AuthError from '../errors/AuthError';
import messages from '../messages';
import config from '../config';
import { verifyTokenAndExtractUser } from '../services/authService/commons';
import { userRoleEnum } from '../models/enums/userEnums';

export default async (req) => {
  const { id } = req.params;
  const jwtToken = req.headers.authorization;
  const { jwtSecret } = config;
  const { role: roleToBeCreated  } = req.body;

  const isRoleToBeCreatedAdmin = roleToBeCreated === userRoleEnum.ADMIN;

  if (!isRoleToBeCreatedAdmin) {
    return
  }

  const loggedUser = await verifyTokenAndExtractUser({ jwtToken, jwtSecret });

  const isLoggedUserAdmin = loggedUser.subscription.role === userRoleEnum.ADMIN;
  const isLoggedUserResourceOwner = loggedUser.id === id;

  if (
    isLoggedUserAdmin ||
    isLoggedUserResourceOwner
  ) {
    req.loggedUser = loggedUser;
  } else {
    throw new AuthError({
      statusCode: httpStatus.FORBIDDEN,
      message: messages.ERROR.AUTH.FORBIDDEN_ACTION,
    });
  }
};
