import { Link } from "react-router-dom";
import ButtonSm from "../components/common/ButtonSm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  removeFromCart,
  updateQuantity,
} from "../redux/features/product/productSlice";
import { TProductSlice } from "../type/product.type";

const Cart = () => {
  const dispatch = useAppDispatch();

  const { items, totalQuantity, totalPrice } = useAppSelector(
    (state) => state.product
  );

  const handleIncrement = (product: TProductSlice) => {
    const productData = {
      _id: product._id,
      quantity: Math.min(product.quantity + 1, product.stock),
    };
    dispatch(updateQuantity(productData));
  };

  const handleDecrement = (product: TProductSlice) => {
    const productData = {
      _id: product._id,
      quantity: Math.max(product.quantity - 1, 1),
    };

    dispatch(updateQuantity(productData));
  };

  return (
    <div className="px-2 md:max-w-7xl mx-auto">
      <div className="container my-8">
        <h1 className="text-2xl font-semibold">My Cart</h1>
        <div className="grid lg:grid-cols-3 gap-10 py-5">
          <div className="lg:col-span-2 overflow-y-auto ">
            {/* Cart Create */}
            {items.length > 0 ? (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex border bg-white border-gray-300 rounded-lg items-center p-4"
                  >
                    <div className="w-1/3 md:w-1/5 flex items-center justify-center">
                      <img
                        className="h-[120px] w-[100px]"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <div className="flex w-2/3 md:w-4/5 flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-3">
                      <div className="flex md:w-2/5 flex-col items-center">
                        <h3 className="text-xl font-title font-semibold">
                          {item.title}
                        </h3>
                        <p>Author : {item.author}</p>
                      </div>
                      <div className="flex gap-1 md:w-1/5 items-center justify-center">
                        <button
                          onClick={() => handleIncrement(item)}
                          className="w-10 h-10 bg-gray-100 text-black rounded hover:bg-gray-300 font-semibold"
                        >
                          +
                        </button>
                        <button className="w-10 h-10 bg-gray-100 text-black rounded hover:bg-gray-300 font-semibold">
                          {item.quantity}
                        </button>
                        <button
                          onClick={() => handleDecrement(item)}
                          className="w-10 h-10 bg-gray-100 text-black rounded hover:bg-gray-300 font-semibold"
                        >
                          -
                        </button>
                      </div>
                      <h2 className="font-title md:w-1/5 font-semibold">
                        Price : {item.price}
                      </h2>
                      <p
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="md:w-1/5"
                      >
                        <ButtonSm size="sm" text="remove" />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          {/* Order Summery */}
          <div className="lg:col-span-1 ">
            <div className="border bg-white border-gray-300 p-4 space-y-2 rounded-lg sticky top-24">
              <h2 className="text-lg font-semibold text-center">
                Order Summary
              </h2>
              <div className="flex justify-between mt-1">
                <span>Total Item</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Price: ${totalPrice}</span>
              </div>
              <div className="border"></div>
              <div className="flex justify-between font-semibold pb-3">
                <span>Total</span>
                <span>Price: ${totalPrice}</span>
              </div>
              <Link to={`/place-order`}>
                <ButtonSm variant="filled" size="md" text="Place Order" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
