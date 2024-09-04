import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import { TrashIcon } from "@heroicons/react/16/solid";
import Avatar from "../Avatar";

const ChatBubbles = ({ message }) => {
  const {
    user,
    jwtToken,
    fetchMessagesWithUserId,
    fetchMessagesWithConversationId,
    selectedConversation,
    getUserById,
  } = useContext(ChatContext);

  const isCurrentUser = message.userId === user.userId;
  const messageUser = getUserById(message.userId);

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `https://chatify-api.up.railway.app/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (selectedConversation) {
        fetchMessagesWithConversationId(selectedConversation);
      } else {
        fetchMessagesWithUserId(user.userId);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div>
      {isCurrentUser ? (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-11 rounded-full">
              <Avatar
                avatarUrl={user.avatar}
                altText={`${user.username}'s avatar`}
              />
            </div>
          </div>
          <div className="chat-header">
            <time className="text-xs opacity-50">
              {new Date(message.createdAt).toLocaleDateString()}
            </time>
          </div>
          <div className="chat-bubble pr-6">
            <p>{message.text}</p>
            <button
              onClick={() => deleteMessage(message.id)}
              className="absolute top-1 right-1 text-red-500 hover:text-red-700"
              aria-label="Delete message"
            >
              <TrashIcon className="h-3 w-3" />
            </button>
            <span className="absolute bottom-0 right-1 small-text opacity-50">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-11 rounded-full">
              <Avatar avatarUrl={messageUser?.avatar} />
            </div>
          </div>
          <div className="chat-header">
            <time className="text-xs opacity-50">
              {new Date(message.createdAt).toLocaleDateString()}
            </time>
          </div>
          <div className="chat-bubble">
            <p>{message.text}</p>
            <span className="absolute bottom-0 left-1 small-text opacity-50">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatBubbles;
