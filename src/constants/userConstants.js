import userRoleEnum from '../models/user/enums/userRoleEnum';

export const userPermissionLevels = Object.freeze({
  [userRoleEnum.RESIDENT]: 0,
  [userRoleEnum.ADMIN]: 10,
  [userRoleEnum.SUDO]: 100,
});
