import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const { logout } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast("👋 Logging out. Catch you later!", {
      className: "custom-toast",
    });
    setTimeout(() => {
      logout();
      navigate("/");
    }, 1000);

  };
  return (
    <button className="btn btn-primary w-1/2" onClick={handleLogout}>
      Logout
    </button>
  );
};
export default Logout;
