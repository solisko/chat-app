import SendMessages from "./SendMessages";
import ShowMessages from "./ShowMessages";

const ShowSendMsg = () => {
  return (
    <>
      <div className="flex-1">
        <ShowMessages />
      </div>
      <div className="flex items-center pb-20">
        <SendMessages />
      </div>
    </>
  );
};
export default ShowSendMsg;
