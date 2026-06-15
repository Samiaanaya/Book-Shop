import { FieldValues, useForm } from "react-hook-form";
import ButtonSm from "../../components/common/ButtonSm";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [UpdatePassword] = useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      const res = await UpdatePassword(data);
      if (res?.error) {
        toast.error("Something went wrong");
      } else {
        Swal.fire({
          title: "Updated!",
          text: "Password has been updated.",
          icon: "success",
        });
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="bg-white shadow-md p-14 rounded-xl w-full md:w-4/5 lg:w-3/6">
        <h2 className="text-2xl font-semibold text-center font-title my-2">
          Update Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
          <div className="w-full">
            <label className="block mb text-sm">Old Password</label>
            <div className="mt-2 relative">
              <input
                type={showPassword1 ? "text" : "password"}
                placeholder="********"
                {...register("oldPassword", { required: true })}
                className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
              />
              {errors.oldPassword && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              <span
                className="absolute top-3 right-3"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <div className="w-full pb-3">
            <label className="block mb text-sm">New Password</label>
            <div className="mt-2 relative">
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="********"
                {...register("newPassword", { required: true })}
                className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
              />
              {errors.newPassword && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              <span
                className="absolute top-3 right-3"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <ButtonSm size="md" variant="filled" text="Update Password" />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
