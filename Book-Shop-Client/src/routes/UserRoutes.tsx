import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";

const UserRoutes = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);

  if (user?.role === "user") {
    return children;
  }

  return <Navigate to={"/login"}></Navigate>;
};

export default UserRoutes;
