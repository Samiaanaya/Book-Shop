import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const getAllUser = catchAsync(async (req, res) => {
  const result = await AdminService.getAllUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetches successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminService.blockUserIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: [],
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminService.getSingleUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieve successfully',
    data: result,
  });
});

export const AdminController = {
  getAllUser,
  blockUser,
  getSingleUser,
};
