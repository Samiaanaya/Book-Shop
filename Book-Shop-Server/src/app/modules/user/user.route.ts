import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleWares/validateRequest';
import { UserValidation } from './user.validation';
import { USER_ROLE } from './user.constant';
import auth from '../../middleWares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.changePassword,
);

router.get(
  '/profile',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getSingleUser,
);

router.patch(
  '/update-profile',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updateUser,
);

export const UserRoutes = router;
