import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import ChatBubbles from "./ChatBubbles";

const ShowMessages = () => {
  const { messages } = useContext(ChatContext);
  const messageEndRef = useRef();

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-1 overflow-y-scroll p-4 mb-4">
      {messages.length === 0 ? (
        <p>No messages yet. Start the conversation!</p>
      ) : (
        messages.map((message) => (
          <ChatBubbles key={message.id} message={message} />
        ))
      )}
      <div ref={messageEndRef}></div>
    </div>
  );
};
export default ShowMessages;
