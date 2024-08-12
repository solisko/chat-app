import { useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../../Context/ChatContextProvider";

const ShowMessages = () => {
  const { messages } = useContext(ChatContext);
  return (
    <div className="pb-44 pt-20 container mx-auto max-w-xl">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
export default ShowMessages;
