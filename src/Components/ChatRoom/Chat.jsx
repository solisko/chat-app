import { useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import ShowMessages from "./ShowMessages";
import SendMessages from "./SendMessages";
import Conversations from "./Conversations";
import Navbar from "../Navbar";

const Chat = () => {
  const { jwtToken, fetchMessages } = useContext(ChatContext);

  useEffect(() => {
    if (jwtToken) {
      fetchMessages();
    }
  }, [jwtToken]);

  return (
    <div className="flex flex-col h-screen hide-scroll">
      <Navbar />
      <div className="flex h-full flex-1 pt-20">
        <Conversations />
        <div className=" w-2/3 ml-auto flex flex-col">
          <div className="flex-1">
            <ShowMessages />
          </div>
          <div className="flex items-center pb-20">
            <SendMessages />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
