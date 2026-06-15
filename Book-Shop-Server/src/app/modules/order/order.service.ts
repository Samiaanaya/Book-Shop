import { JwtPayload } from 'jsonwebtoken';
import { Book } from '../book/book.model';
import { User } from '../user/user.model';
import { Order } from './order.model';
import { orderUtils } from './order.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TProducts } from './order.interface';

const createOrderIntoDB = async (
  user: JwtPayload,
  payload: { products: { _id: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');
  }
  const existUser = await User.findById(user?.id);
  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Book.findById(item._id);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  const transformedProducts: any[] = [];
  productDetails.forEach((product) => {
    transformedProducts.push({
      product: product?._id,
      quantity: product?.quantity,
    });
  });

  const orderData = {
    user: user?.id,
    products: transformedProducts,
    totalPrice,
  };
  let order = await Order.create(orderData);

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: existUser?.name,
    customer_address: existUser?.address,
    customer_email: existUser?.email,
    customer_phone: String(existUser?.phone),
    customer_city: existUser?.address,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  // update product quantity
  if (verifiedPayment[0].customer_order_id) {
    const existOrder = await Order.findById(
      verifiedPayment[0]?.customer_order_id,
    );

    const products = existOrder?.products as TProducts;

    for (let i = 0; i < products?.length; i++) {
      const product = await Book.findById(products[i].product);

      if (product) {
        product.quantity -= products[i].quantity;

        if (product.quantity == 0) {
          product.inStock = false;
        }
      }
      await product?.save();
    }
  }

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }
  return verifiedPayment;
};

const getUserOrderFromDB = async (id: string) => {
  const result = await Order.find({ user: id }).populate('user');
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await Order.find().populate('user');
  return result;
};

const calculateRevenueFromDB = async () => {
  const result = await Order.aggregate([
    { $unwind: '$products' },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
        totalProductSells: { $sum: '$products.quantity' },
      },
    },
    { $project: { _id: 0, totalRevenue: 1 } },
  ]);
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
};

export const OrderServices = {
  createOrderIntoDB,
  calculateRevenueFromDB,
  getAllOrderFromDB,
  getUserOrderFromDB,
  verifyPayment,
  deleteOrderFromDB,
};
