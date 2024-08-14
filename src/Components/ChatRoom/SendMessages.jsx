import { useContext, useState } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";

const SendMessages = () => {
  const { jwtToken, fetchMessages } = useContext(ChatContext);
  const [newMsg, setNewMsg] = useState("");

  const sendMessage = async () => {
    try {
      const response = await fetch(
        "https://chatify-api.up.railway.app/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            text: newMsg,
            conversationId: "e98dfca3-b5f4-4113-aaa7-e304cbbe1ce2",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const data = await response.json();
      // console.log("Message sent:", data);
      setNewMsg("");
      fetchMessages();
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMsg.trim() !== "") {
      sendMessage();
    } else {
      alert("Enter valid message!");
    }
  };

  return (
    <div className="bg-primary fixed bottom-0 w-full py-10 shadow.lg">
      <form
        className="container mx-auto max-w-xl flex px-2"
        onSubmit={handleSendMessage}
      >
        <input
          className="input w-full rounded-r-none focus:outline-none"
          type="text"
          placeholder="Type here..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button type="submit" className="btn w-auto rounded-l-none">
          Send
        </button>
      </form>
    </div>
  );
};
export default SendMessages;
