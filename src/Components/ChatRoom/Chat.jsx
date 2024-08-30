import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import { Outlet } from "react-router-dom";
import Conversations from "./Conversations";
import Navbar from "../Navbar";

const Chat = () => {
  const {
    jwtToken,
    fetchMessagesWithUserId,
    fetchMessagesWithConversationId,
    selectedConversation,
  } = useContext(ChatContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jwtToken) {
      if (selectedConversation) {
        fetchMessagesWithConversationId(selectedConversation);
      } else {
        fetchMessagesWithUserId();
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [jwtToken, selectedConversation]);

  return (
    <div className="flex flex-col h-screen hide-scroll">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner text-primary"></span>
          <p className="ml-2">Loading chat...</p>
        </div>
      ) : (
        <div className="flex h-full mt-24">
          <Conversations />
          <div className="w-2/3 ml-auto flex flex-col bg-base-200">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
