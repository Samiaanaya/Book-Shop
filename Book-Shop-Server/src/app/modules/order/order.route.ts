import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLE.admin, USER_ROLE.user),
  OrderController.createOrder,
);
router.get(
  '/verify',
  auth(USER_ROLE.admin, USER_ROLE.user),
  OrderController.verifyPayment,
);

router.get('/all-order', OrderController.getAllOrder);

router.get(
  '/user-order',
  auth(USER_ROLE.admin, USER_ROLE.user),
  OrderController.getUserOrder,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  OrderController.deleteOrder,
);

router.get('/revenue', OrderController.calculateRevenue);

export const OrderRoutes = router;
