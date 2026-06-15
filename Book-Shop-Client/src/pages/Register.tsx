import { Link, useNavigate } from "react-router-dom";
import imgBg from "../assets/login.png";
import logo from "../assets/logo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../App.css";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../redux/features/auth/auth.api";
import Swal from "sweetalert2";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import ButtonSm from "../components/common/ButtonSm";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Register] = useRegisterMutation();
  const [Login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await Register(userInfo);

      if (res?.error) {
        Swal.fire({
          title: "Oops?",
          text: "Something went wrong. Please try again!",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const loginResult = await Login({
          email: data.email,
          password: data.password,
        });
        const user = verifyToken(loginResult?.data?.data?.token);
        dispatch(setUser({ user, token: loginResult.data.data.token }));

        Swal.fire({
          title: "Congratulations!",
          text: "You are register successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Oops?",
        text: "Something went wrong. Please try again!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  return (
    <div className="my-10 px-2 md:max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center px-3 md:px-12 my-8">
        <div className="md:w-1/2 flex items-center justify-center">
          <img className="w-[600px] md:h-[600px]" src={imgBg} alt="" />
        </div>

        <div className="w-full md:w-1/2 p-5 md:p-8 lg:px-10 lg:py-14 shadow-md space-y-4 bg-white rounded-lg">
          <div className="flex items-center justify-center">
            <img className="w-[50px]" src={logo} alt="" />
            <h2 className="font-semibold md:text-3xl">
              Ink<span className="primary-color">Spire</span>
            </h2>
          </div>
          <h2 className="text-base text-center pb-3">
            Welcome to InkSpire. Please Register!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block mb text-sm">Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("name", { required: true })}
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb text-sm">Email address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    {...register("email", { required: true })}
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb text-sm">Password</label>
                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    {...register("password", { required: true })}
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                  <span
                    className="absolute top-4 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
              </div>

              <ButtonSm size="lg" text={"Register"}></ButtonSm>
            </div>
          </form>

          <div>
            <p className="text-lg text-center">
              If you have an account?{" "}
              <Link className="font-semibold primary-color" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
