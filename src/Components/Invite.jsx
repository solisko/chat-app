import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";

const Invite = ({ userId }) => {
  const { jwtToken, BASE_URL } = useContext(ChatContext);
  const [isInvited, setIsInvited] = useState(false);

  useEffect(() => {
    const invitedUsers = JSON.parse(localStorage.getItem("invitedUsers")) || [];
    if (invitedUsers.includes(userId)) {
      setIsInvited(true);
    }
  }, [userId]);

  const inviteUserToChat = async () => {
    const newConversationId = crypto.randomUUID();

    try {
      const response = await fetch(`${BASE_URL}/invite/${userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: newConversationId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send invite");
      }
      const data = await response.json();
      // console.log("Invite sent successfully:", data);
      const invitedUsers = JSON.parse(localStorage.getItem("invitedUsers")) || [];
      invitedUsers.push(userId);
      localStorage.setItem("invitedUsers", JSON.stringify(invitedUsers));
      setIsInvited(true);
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  };

  return (
    <button
      className="btn btn-outline btn-accent btn-xs ml-4"
      onClick={inviteUserToChat}
      disabled={isInvited}
    >
      {isInvited ? "Invited" : "Invite"}
    </button>
  );
};

export default Invite;