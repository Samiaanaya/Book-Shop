import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const blockUserIntoDB = async (id: string) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  if (existingUser.role == 'admin') {
    throw new AppError(httpStatus.BAD_REQUEST, 'You Can Not Block Admin');
  }

  const result = await User.findByIdAndUpdate(id, { isBlocked: true });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  return result;
};

export const AdminService = {
  getAllUserFromDB,
  blockUserIntoDB,
  getSingleUserFromDB,
};
