import { useContext, useEffect } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, jwtToken, handleLogout, isTokenExpired } =
    useContext(ChatContext);

  useEffect(() => {
    if (!isAuthenticated || isTokenExpired(jwtToken)) {
      handleLogout();
    }
  }, [isAuthenticated, jwtToken, isTokenExpired, handleLogout]);

  if (!isAuthenticated || isTokenExpired(jwtToken)) {
    return <Navigate to="/" replace state={{ protectedRoute: true }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
