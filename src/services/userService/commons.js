import UserError from '../../errors/UserError';
import UserModel from '../../models/user/UserModel';
import messages from '../../messages';
import { userPermissionLevels } from '../../constants/userConstants';
import httpStatus from '../../constants/httpStatus';

export const findById = async (userId) => UserModel.findById(userId);

export const findByIdAndValidateIfExists = async (userId) => {
  const user = await findById(userId);
  console.log(user)
  if (!user) {
    throw new UserError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.ERROR.USER.NOT_FOUND,
    });
  }
  
  return user
};

export const getPermissionInfoFromUserRole = (role) => {
  if (typeof role !== 'string') {
    throw new Error("Param 'role' must be a string.");
  }

  return {
    role,
    level: userPermissionLevels[role],
  };
};

export const getPermissionInfoFromUserLevel = (inputLevel) => {
  if (typeof inputLevel !== 'number') {
    throw new Error("Param 'level' must be a number.");
  }

  const [role, foundLevel] = Object.entries(userPermissionLevels).find(
    ([, level]) => level === inputLevel
  );

  return {
    role,
    level: foundLevel,
  };
};
