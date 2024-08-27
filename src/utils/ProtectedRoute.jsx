import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, jwtToken, logout, isTokenExpired } =
    useContext(ChatContext);

  if (!isAuthenticated || isTokenExpired(jwtToken)) {
    logout();
    return <Navigate to="/" replace state={{ protectedRoute: true }} />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
