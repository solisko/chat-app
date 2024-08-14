import { useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import ShowMessages from "./ShowMessages";
import SendMessages from "./SendMessages";
import SideNav from "../SideNav";
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
    <div>
      <div className="nav">

      <Navbar/>
      </div>
      <Conversations/>
      <ShowMessages />
      <SendMessages />
      <SideNav />
    </div>
  );
};
export default Chat;
