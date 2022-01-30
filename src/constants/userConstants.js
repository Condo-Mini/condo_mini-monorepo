import { userRoleEnum } from '../models/enums/userEnums';

export const userPermissionLevels = Object.freeze({
  [userRoleEnum.RESIDENT]: 0,
  [userRoleEnum.ADMIN]: 10,
});
