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
            conversationId: "2deeb52a-8b97-47a1-9c14-e4ec1e167ef9",
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
    <div className="fixed bottom-0 left-1/3 w-2/3 bg-primary py-4 px-6">
      <form
        className="flex justify-center items-center w-full max-w-xl mx-auto"
        onSubmit={handleSendMessage}
      >
        <input
          className="input flex-grow rounded-r-none focus:outline-none"
          id="send"
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
