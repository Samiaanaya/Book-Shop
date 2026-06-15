import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already exist');
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not Found! ');
  }

  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked! ');
  }

  // checking if the password is correct
  const matchedPassword = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!matchedPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched! ');
  }

  // create token and sent to the client
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not Found! ');
  }

  // checking if the user is blocked
  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked! ');
  }

  // create token and sent to the client
  const jwtPayload = {
    id: user?.id,
    email: user?.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const isUserExist = await User.findOne({ _id: user?.id }).select('+password');
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    isUserExist?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findByIdAndUpdate(
    { _id: user?.id },
    { password: newHashedPassword },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  return result;
};

const updateUserFromDB = async (id: string, payload: Partial<TUser>) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserService = {
  createUserIntoDB,
  loginUser,
  refreshToken,
  changePassword,
  getSingleUserFromDB,
  updateUserFromDB,
};
