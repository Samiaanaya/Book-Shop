import { FieldValues, useForm } from "react-hook-form";
import ButtonSm from "../../components/common/ButtonSm";
import axios from "axios";
import { toast } from "sonner";
import Loader from "../../components/common/Loader";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../type/auth.type";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const { data: userData, isLoading } = useGetMyProfileQuery(user?.id);
  const [UpdateProfile] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const formData = new FormData();
      formData.append("file", data.image[0]);
      formData.append("upload_preset", "book_shop");
      formData.append("cloud_name", "dge3fjctm");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dge3fjctm/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;

      const profileData = {
        ...data,
        image: imageUrl,
        phone: Number(data.phone),
      };
      const res = await UpdateProfile(profileData);
      if (res?.error) {
        toast.error("Something went wrong");
      } else {
        Swal.fire({
          title: "Updated!",
          text: "Profile has been updated.",
          icon: "success",
        });
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md p-14 rounded-2xl w-full md:w-4/5 lg:w-3/6">
        <h2 className="text-2xl font-semibold text-center font-title my-2">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
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

          <div className="w-full">
            <label className="block mb text-sm">Image</label>
            <div className="mt-1">
              <input
                type="file"
                {...register("image", { required: true })}
                className="w-full p-1 border rounded-md border-gray-400 text-gray-900"
              />
              {errors.image && (
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

          <div>
            <ButtonSm size="md" variant="filled" text="Update Profile" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
