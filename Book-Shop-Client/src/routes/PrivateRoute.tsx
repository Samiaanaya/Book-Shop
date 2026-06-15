import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);

  if (token) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
