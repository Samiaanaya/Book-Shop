import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";

const AdminRoutes = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);

  if (user?.role === "admin") {
    return children;
  }

  return <Navigate to={"/login"}></Navigate>;
};

export default AdminRoutes;
