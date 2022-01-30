import AuthError from '../errors/AuthError';
import httpStatus from '../constants/httpStatus';
import messages from '../messages';

export default (req) => {
  const { loggedUser, permissionLevel } = req;

  const doesLoggedUserHasPermission =
    loggedUser.subscription.permission.level >= permissionLevel;

  if (!doesLoggedUserHasPermission) {
    throw new AuthError({
      statusCode: httpStatus.FORBIDDEN,
      message: messages.ERROR.AUTH.FORBIDDEN_ACTION,
    });
  }
};
