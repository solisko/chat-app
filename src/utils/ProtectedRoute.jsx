import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(ChatContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Component {...rest} />;
};
export default ProtectedRoute;
