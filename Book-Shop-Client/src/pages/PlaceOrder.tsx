import { useEffect } from "react";
import { useCreateOrderMutation } from "../redux/features/order/order.api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "sonner";

import ButtonSm from "../components/common/ButtonSm";
import { FieldValues, useForm } from "react-hook-form";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "../redux/features/user/user.api";
import { TUser } from "../type/auth.type";
import { clearCart } from "../redux/features/product/productSlice";

const PlaceOrder = () => {
  const dispatch = useAppDispatch();
  const { items, totalQuantity, totalPrice } = useAppSelector(
    (state) => state.product
  );
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const { data: userData } = useGetMyProfileQuery(user?.id);
  const [UpdateProfile] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const profileData = {
        ...data,
        phone: Number(data.phone),
      };

      const res = await UpdateProfile(profileData);

      if (res?.error) {
        toast.error("Something went wrong");
      } else {
        handlePlaceOrder();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handlePlaceOrder = async () => {
    const res = await createOrder({ products: items });
    if (res?.error) {
      toast.error("Something went wrong");
    } else {
      dispatch(clearCart());
    }
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  return (
    <div className="px-2 md:max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 lg:gap-14 my-8">
        <div className="w-full bg-white md:w-1/2">
          <div className="border p-14 lg:p-16 rounded-lg w-full">
            <h2 className="text-2xl text-center font-semibold my-2">
              Information Update
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 w-full"
            >
              <div className="w-full">
                <label className="block mb text-sm">Name</label>
                <div className="mt-1">
                  <input
                    type="name"
                    defaultValue={userData?.data?.name}
                    {...register("name", { required: true })}
                    className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label className="block mb text-sm">Email</label>
                <div className="mt-1">
                  <input
                    type="email"
                    value={userData?.data?.email}
                    {...register("email", { required: true })}
                    className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label className="block mb text-sm">Phone</label>
                <div className="mt-1">
                  <input
                    type="number"
                    defaultValue={userData?.data?.phone}
                    {...register("phone", { required: true })}
                    className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full pb-2">
                <label className="block mb text-sm">Address</label>
                <div className="mt-1">
                  <input
                    type="text"
                    defaultValue={userData?.data?.address}
                    {...register("address", { required: true })}
                    className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.address && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <ButtonSm size="md" variant="filled" text="Confirm Order" />
            </form>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="border bg-white p-4 rounded-lg sticky top-24">
            <h2 className="text-lg font-title font-semibold text-center">
              Order Summary
            </h2>
            <div className="flex justify-between mt-1">
              <span>Total Item</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Subtotal</span>
              <span>Price: ${totalPrice}</span>
            </div>
            <div className="border my-3"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Price: {totalPrice} Taka</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
