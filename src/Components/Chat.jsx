import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/img/astronaut.png"; // Importera standardbilden

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const Chat = () => {
  const { logout, user } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const avatarSrc = user?.avatar && isValidUrl(user.avatar) ? user.avatar : defaultAvatar;

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <img
          src={avatarSrc}
          alt={`${user.username}'s avatar`}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <p style={{ marginTop: "10px", fontSize: "1.2em", fontWeight: "bold" }}>
          {user?.username || "Anonymous"}
        </p>{" "}
      </div>
      <button class="btn transition duration-200 ease-in-out hover:bg-primary" onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Chat;
