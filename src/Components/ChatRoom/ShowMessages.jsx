import { useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../../Context/ChatContextProvider";

const ShowMessages = () => {
  const { messages } = useContext(ChatContext);
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* flex-1 overflow-y-auto p-4 */}
      {/* pb-40 pt-10 container mx-auto mx-w-full px-4 */}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
export default ShowMessages;
