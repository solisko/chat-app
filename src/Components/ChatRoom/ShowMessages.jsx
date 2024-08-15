import { useContext, useEffect, useRef } from "react";
import Message from "./Message";
import { ChatContext } from "../../Context/ChatContextProvider";

const ShowMessages = () => {
  const { messages } = useContext(ChatContext);
  const messageEndRef = useRef();

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-1 overflow-y-scroll p-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messageEndRef}></div>
    </div>
  );
};
export default ShowMessages;
