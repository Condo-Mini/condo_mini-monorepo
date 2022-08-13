import userRoleEnum from '../models/user/enums/userRoleEnum';

export const userPermissionLevels = Object.freeze({
  [userRoleEnum.SUDO]: 1000,
  [userRoleEnum.ADMIN]: 100,
  [userRoleEnum.GUARD]: 10,
  [userRoleEnum.RESIDENT]: 1,
});
