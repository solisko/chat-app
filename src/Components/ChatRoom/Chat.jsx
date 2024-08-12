import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";
import ShowMessages from "./ShowMessages";
import SendMessages from "./SendMessages";

const Chat = () => {
  const { logout, jwtToken, user, avatarSrc, fetchMessages } =
    useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken) {
      fetchMessages();
    }
  }, [jwtToken]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
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
        </p>
      </div>
      <button
        className="btn transition duration-200 ease-in-out hover:bg-primary"
        onClick={handleLogout}
      >
        Logout
      </button>
      <ShowMessages />
      <SendMessages />
    </div>
  );
};
export default Chat;
