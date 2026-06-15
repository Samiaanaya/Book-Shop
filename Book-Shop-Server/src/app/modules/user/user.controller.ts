import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserService.loginUser(req.body);

  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: { token: accessToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully',
    data: { token: result.accessToken },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await UserService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Updated successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await UserService.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieve successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await UserService.updateUserFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
  refreshToken,
  changePassword,
  updateUser,
  getSingleUser,
};
