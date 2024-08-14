import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <button
      className="btn transition duration-200 ease-in-out hover:bg-primary"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};
export default Logout;
