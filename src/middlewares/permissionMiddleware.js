import AuthError from '../errors/AuthError';
import httpStatus from '../constants/httpStatus';
import messages from '../messages';
import { userPermissionLevels } from '../constants/userConstants';

export default (req) => {
  const { loggedUser, permissionRole, body } = req;
  const loggedUserPermissionLevel = loggedUser.profile.permission.level;
  const loggedUserPermissionRole = loggedUser.profile.permission.role;

  const doesLoggedUserHaveEndpointPermission =
    loggedUserPermissionLevel >= userPermissionLevels[permissionRole];

  if (!doesLoggedUserHaveEndpointPermission) {
    throw new AuthError({
      statusCode: httpStatus.FORBIDDEN,
      message: messages.get('ERROR.AUTH.FORBIDDEN_ENDPOINT', permissionRole),
    });
  }

  if (body?.role) {
    const doesLoggedUserHaveHierarchyPermission =
      loggedUserPermissionLevel >= userPermissionLevels[body.role];

    if (!doesLoggedUserHaveHierarchyPermission) {
      throw new AuthError({
        statusCode: httpStatus.FORBIDDEN,
        message: messages.get(
          'ERROR.AUTH.FORBIDDEN_HIERARCHY',
          loggedUserPermissionRole
        ),
      });
    }
  }
};
