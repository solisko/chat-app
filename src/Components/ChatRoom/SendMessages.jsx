import { useContext, useState } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

const SendMessages = () => {
  const { jwtToken, selectedConversation, fetchMessagesWithConversationId } =
    useContext(ChatContext);
  const [newMsg, setNewMsg] = useState("");

  const sanitizeMessage = (message) => {
    return DOMPurify.sanitize(message);
  };

  const sendMessage = async (conversationId) => {
    try {
      const sanitizedMsg = sanitizeMessage(newMsg);
      const response = await fetch(
        "https://chatify-api.up.railway.app/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            text: sanitizedMsg,
            conversationId: conversationId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const data = await response.json();
      // console.log(data.latestMessage.text);
      setNewMsg("");
      if (selectedConversation) {
        fetchMessagesWithConversationId(selectedConversation);
      }
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!selectedConversation && newMsg.trim() === "") {
      toast.info("No conversation selected and message cannot be empty!", {
        className: "custom-toast",
      });
    } else if (!selectedConversation) {
      toast.info("No conversation selected!", {
        className: "custom-toast",
      });
    } else if (newMsg.trim() === "") {
      toast.info("Enter valid message!", {
        className: "custom-toast",
      });
    } else {
      sendMessage(selectedConversation);
    }
  };

  return (
    <div className="fixed bottom-0 left-1/3 w-2/3 bg-primary py-4 px-6">
      <form
        className="flex justify-center items-center w-full max-w-xl mx-auto"
        onSubmit={handleSendMessage}
      >
        <input
          className="input resize-none flex-grow rounded-r-none focus:outline-none p-2"
          id="send"
          type="text"
          placeholder="Type here..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button type="submit" className="btn w-auto rounded-l-none">
          <PaperAirplaneIcon className="h-5 h-5" />
        </button>
      </form>
    </div>
  );
};
export default SendMessages;
