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
      {/* flex-1 overflow-y-auto p-4 */}
      {/* pb-40 pt-10 container mx-auto mx-w-full px-4 */}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messageEndRef}></div>
    </div>
  );
};
export default ShowMessages;
