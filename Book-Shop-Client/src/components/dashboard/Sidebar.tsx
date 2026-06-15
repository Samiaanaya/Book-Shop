import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { FaUserCheck, FaBorderNone } from "react-icons/fa";
import SidebarRoute from "./SidebarRoute";
import { BsBookHalf, BsBook, BsGraphUpArrow } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
    Swal.fire({
      title: "Success!",
      text: "You are logged out successfully!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-slate-200 text-gray-800 flex justify-between md:hidden">
        <div className="block cursor-pointer p-3 font-bold">
          <Link to="/" className="flex justify-center items-center gap-3">
            <img src={logo} width="40" height="40" alt="" />
            <h2 className="text-xl">
              Ins <span className="text-blue-700">Spire</span>
            </h2>
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-200 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="w-full hidden md:flex px-4 py-1 border border-gray-300  rounded-md justify-center items-center bg-[#00306019] mx-auto">
            <Link to="/" className="flex items-center justify-center gap-2">
              <img src={logo} width="40" height="40" alt="" />
              <h2 className="text-2xl font-semibold">
                Ins<span className="text-blue-700">Spire</span>
              </h2>
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {user?.role === "admin" && (
                <SidebarRoute
                  path={"statistics"}
                  text={"Dashboard"}
                  icons={<BsGraphUpArrow className="w-5 h-5" />}
                />
              )}

              {user?.role === "admin" && (
                <SidebarRoute
                  path={"manage-products"}
                  text={"Manage Products"}
                  icons={<BsBookHalf className="w-5 h-5" />}
                />
              )}

              {user?.role === "admin" && (
                <SidebarRoute
                  path={"add-product"}
                  text={"Add Product"}
                  icons={<BsBook className="w-5 h-5" />}
                />
              )}

              {user?.role === "admin" && (
                <SidebarRoute
                  path={"all-order"}
                  text={"All Order"}
                  icons={<FaBorderNone className="w-5 h-5" />}
                />
              )}

              {user?.role === "admin" && (
                <SidebarRoute
                  path={"all-user"}
                  text={"All User"}
                  icons={<FaUsers className="w-5 h-5" />}
                />
              )}

              <SidebarRoute
                path={"my-order"}
                text={"My Order"}
                icons={<MdProductionQuantityLimits className="w-5 h-5" />}
              />

              <SidebarRoute
                path={"change-password"}
                text={"Change Password"}
                icons={<RiLockPasswordLine className="w-5 h-5" />}
              />

              <SidebarRoute
                path={"update-profile"}
                text={"Update Profile"}
                icons={<FcSettings className="w-5 h-5" />}
              />
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <SidebarRoute
            path={"my-profile"}
            text={"My Profile"}
            icons={<FaUserCheck className="w-5 h-5" />}
          />

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-3 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
