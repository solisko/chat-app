import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";

const Message = ({ message }) => {
  const { avatarSrc, user, jwtToken } = useContext(ChatContext);

  const isCurrentUser = message.userId === user.userId;

  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://chatify-api.up.railway.app/users/${invitedUserId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${jwtToken}`,
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user info");
  //       }
  //       const data = await response.json();

  //     } catch (error) {
  //       console.error("Failed to fetch user info:", error);
  //     }
  //   };

  return (
    <div>
      {isCurrentUser ? (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={avatarSrc} alt={user.username} />
            </div>
          </div>
          <div className="chat-header">
            {user.username}
            <time className="text-xs opacity-50">
              {new Date(message.createdAt).toLocaleString()}
            </time>
          </div>
          <div className="chat-bubble">{message.text}</div>
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="" alt={`User ${message.userId}`} />
            </div>
          </div>
          <div className="chat-header">
            {`User ${message.userId}`}
            <time className="text-xs opacity-50">
              {new Date(message.createdAt).toLocaleString()}
            </time>
          </div>
          <div className="chat-bubble">{message.text}</div>
        </div>
      )}
    </div>
  );
};
export default Message;
