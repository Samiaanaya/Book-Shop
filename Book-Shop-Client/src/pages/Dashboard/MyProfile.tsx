import { Link } from "react-router-dom";
import bg from "../../assets/pexels-pixabay-207636.jpg";
import Loader from "../../components/common/Loader";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../type/auth.type";

const MyProfile = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const { data: userData, isLoading } = useGetMyProfileQuery(user?.id);
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white shadow-md rounded-2xl w-full md:w-4/5 lg:w-3/5">
          <img
            alt="profile"
            src={bg}
            className="w-full mb-4 rounded-t-lg h-36"
          />
          <div className="flex flex-col items-center justify-center p-4 -mt-16">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={userData?.data?.image || bg}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </a>

            <p className="py-2 uppercase font-title font-medium px-4 text-xs text-white bg-blue-700 rounded-full">
              {userData?.data?.role}
            </p>

            <div className="w-full p-2 mt-2 rounded-lg">
              <div className="text-sm space-y-1 text-center text-gray-600">
                <p>
                  <span className="font-semibold">Name : </span>
                  {userData?.data?.name}
                </p>
                <p>
                  <span className="font-semibold">Email : </span>
                  {userData?.data?.email}
                </p>
                <p>
                  <span className="font-semibold">Mobile : </span>
                  {userData?.data?.phone || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Address : </span>
                  {userData?.data?.address || "N/A"}
                </p>
                <button className="py-2 uppercase px-4 text-xs text-white bg-blue-700 rounded-full font-title font-medium">
                  <Link to={`/dashboard/update-profile`}> Update</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
