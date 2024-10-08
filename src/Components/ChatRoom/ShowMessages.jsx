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
    <div className="flex-1 overflow-x-hidden p-4 bg-base-200">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center mt-20">
          <p className="text-lg rounded-lg p-4 shadow-md bg-neutral-content">
            No messages yet. Start the conversation!
          </p>
        </div>
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
