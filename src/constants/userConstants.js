import userRoleEnum from '../models/user/enums/userRoleEnum';

export const userPermissionLevels = Object.freeze({
  [userRoleEnum.RESIDENT]: 1,
  [userRoleEnum.GUARD]: 10,
  [userRoleEnum.ADMIN]: 100,
  [userRoleEnum.SUDO]: 1000,
});
