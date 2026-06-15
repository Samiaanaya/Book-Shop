import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token as string,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const { email, role } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not Found! ');
    }

    // checking if the user is blocked
    if (user?.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked! ');
    }

    // Check if role is authorized
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
