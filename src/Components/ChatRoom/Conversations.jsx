import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";

const Conversations = () => {
  const {
    user,
    allUsers,
    selectedConversation,
    setSelectedConversation,
    messages,
  } = useContext(ChatContext);
  const navigate = useNavigate();
  const [invites, setInvites] = useState([]);
  const [latestMessages, setLatestMessages] = useState({});

  useEffect(() => {
    let parsedInvites = [];

    if (user.invite !== null) {
      try {
        parsedInvites = JSON.parse(user.invite);
      } catch (error) {
        console.error("Failed to parse invites:", error);
      }
    }

    const updatedInvites = parsedInvites.map((invite) => {
      const matchingUser = allUsers.find((u) => u.username === invite.username);
      return {
        ...invite,
        userId: matchingUser?.id || null,
        avatar: matchingUser?.avatar || null,
      };
    });

    setInvites(updatedInvites);
  }, [user.invite, allUsers]);

  useEffect(() => {
    const fetchLatestMessages = () => {
      const messagesByConversationId = {};
      messages.forEach((message) => {
        const conversationId = message.conversationId;
        if (
          !messagesByConversationId[conversationId] ||
          new Date(message.createdAt) >
            new Date(messagesByConversationId[conversationId].createdAt)
        ) {
          messagesByConversationId[conversationId] = message;
        }
      });
      setLatestMessages(messagesByConversationId);
    };

    fetchLatestMessages();
  }, [messages]);

  const handleSelectConversation = (invite) => {
    setSelectedConversation(invite.conversationId);
    navigate("/chat");
  };

  return (
    <div className="fixed h-screen w-1/3 border-r border-base-200 flex flex-col overflow-hidden">
      <table className="table">
        <thead>
          <tr>
            <th>Chats</th>
          </tr>
        </thead>
        <tbody>
          {invites.length === 0 ? (
            <tr>
              <td className="text-center">You don't have any conversations!</td>
            </tr>
          ) : (
            invites.map((invite) => (
              <tr
                key={invite.conversationId}
                className={`${
                  selectedConversation === invite.conversationId
                    ? "bg-base-200"
                    : ""
                } hover:bg-base-100 hover:brightness-90 hover:scale-105 transition-all duration-200`}
              >
                <td>
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => handleSelectConversation(invite)}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="avatar flex-shrink-0 w-14 h-14 rounded-full overflow-hidden">
                      <Avatar
                        avatarUrl={invite.avatar}
                        altText={`${invite.username}'s avatar`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">
                        {invite.username}
                      </div>
                      <div className="text-xs opacity-50 truncate text-ellipse">
                        {latestMessages[invite.conversationId]?.text || ""}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Conversations;
