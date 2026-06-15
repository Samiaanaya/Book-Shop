import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { BookRoutes } from '../modules/book/book.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: BookRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
