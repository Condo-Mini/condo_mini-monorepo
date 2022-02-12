import UserError from '../../errors/UserError';
import UserModel from '../../models/user/UserModel';
import messages from '../../messages';

export const findById = async (userId) => UserModel.findById(userId);

export const findByIdAndValidateIfExists = async (userId) => {
  const user = await findById(userId);

  if (!user) {
    throw new UserError({
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: messages.ERROR.USER.NOT_FOUND,
    });
  }
};
