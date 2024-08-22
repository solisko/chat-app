import { useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import Conversations from "./Conversations";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

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
      <div className="flex h-full flex-1 mt-24">
        <Conversations />
        <div className="w-2/3 ml-auto flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Chat;
