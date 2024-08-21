import { useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import ShowMessages from "./ShowMessages";
import SendMessages from "./SendMessages";
import Conversations from "./Conversations";
import Navbar from "../Navbar";

const Chat = () => {
  const {
    jwtToken,
    fetchMessagesWithUserId,
    fetchMessagesWithConversationId,
    selectedConversation,
  } = useContext(ChatContext);

  useEffect(() => {
    if (jwtToken) {
      if (selectedConversation) {
        fetchMessagesWithConversationId(selectedConversation);
      } else {
        fetchMessagesWithUserId();
      }
    }
  }, [jwtToken, selectedConversation]);

  return (
    <div className="flex flex-col h-screen hide-scroll">
      <Navbar />
      <div className="flex h-full flex-1 pt-24">
        <Conversations />
        <div className="w-2/3 ml-auto flex flex-col">
          <div className="flex-1">
            <ShowMessages />
          </div>
          <div className="flex items-center pb-24">
            <SendMessages />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
