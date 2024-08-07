import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { logout } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>Chat</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Chat;
