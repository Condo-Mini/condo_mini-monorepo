import mongoose from 'mongoose';
import faker from 'faker';
import userRoleEnum from '../../src/models/user/enums/userRoleEnum';
import UserModel from '../../src/models/user/UserModel';
import userService from '../../src/services/userService';

const now = new Date();

export const createUserToDB = async ({
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
  role = userRoleEnum.RESIDENT,
  createdAt = now,
  updatedAt = now,
  createdBy = mongoose.Types.ObjectId(),
  updatedBy,
}) => {
  const user = new UserModel({
    firstName,
    lastName,
    profile: {
      email,
      password,
      permission: {
        ...userService.getPermissionInfoFromUserRole(role),
      },
    },
    createdAt,
    updatedAt,
    createdBy,
    updatedBy: updatedBy || createdBy,
  });

  await user.save();
  return user;
};
