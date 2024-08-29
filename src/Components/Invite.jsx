import { useState, useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";

const Invite = ({ userId }) => {
  const { jwtToken, BASE_URL } = useContext(ChatContext);
  const [isInvited, setIsInvited] = useState(false);

//   const inviteUserToChat = async () => {
//     const newConversationId = crypto.randomUUID();

//     try {
//       const response = await fetch(`${BASE_URL}/invite/${userId}`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${jwtToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           conversationId: newConversationId,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to send invite");
//       }
//       const data = await response.json();
//       console.log("Invite sent successfully:", data);
//       setIsInvited(true); 
//     } catch (error) {
//       console.error("Error inviting user:", error);
//     }
//   };

  return (
    <button
      className="btn btn-outline btn-accent btn-xs ml-4"
    //   onClick={inviteUserToChat}
    //   disabled={isInvited}
    > Invite
      {/* {isInvited ? "Invited" : "Invite"} */}
    </button>
  );
};

export default Invite;
