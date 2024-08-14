import { useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import ShowMessages from "./ShowMessages";
import SendMessages from "./SendMessages";
import SideNav from "../SideNav";

const Chat = () => {
  const { jwtToken, fetchMessages } = useContext(ChatContext);

  useEffect(() => {
    if (jwtToken) {
      fetchMessages();
    }
  }, [jwtToken]);

  return (
    <div>
      <SideNav />
      <ShowMessages />
      <SendMessages />
    </div>
  );
};
export default Chat;
