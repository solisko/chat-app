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
    sentInvites,
    BASE_URL,
    jwtToken,
    getUserById,
  } = useContext(ChatContext);
  const navigate = useNavigate();
  const [invites, setInvites] = useState([]);
  const [participants, setParticipants] = useState({});

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
    const fetchConversationsAndParticipants = async () => {
      try {
        const fetchParticipantsPromises = sentInvites.map(
          async (conversationId) => {
            const messageResponse = await fetch(
              `${BASE_URL}/messages?conversationId=${conversationId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );

            if (!messageResponse.ok) {
              throw new Error(
                `Failed to fetch messages for conversation ${conversationId}`
              );
            }

            const messages = await messageResponse.json();
            const uniqueParticipants = [
              ...new Set(messages.map((message) => message.userId)),
            ];

            setParticipants((prev) => ({
              ...prev,
              [conversationId]: uniqueParticipants,
            }));
          }
        );

        await Promise.all(fetchParticipantsPromises);
      } catch (error) {
        console.error(
          "Failed to fetch conversations and participants:",
          error.message
        );
      }
    };

    fetchConversationsAndParticipants();
  }, [sentInvites, jwtToken]);

  const getConversationParticipants = (conversationId) => {
    const userIds = participants[conversationId] || [];
    const uniqueUsernames = new Set();

    userIds.forEach((userId) => {
      const user = getUserById(userId);
      if (user) {
        uniqueUsernames.add(user.username);
      }
    });

    return Array.from(uniqueUsernames).join(", ");
  };

  const handleSelectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    navigate("/chat");
  };

  return (
    <div className="h-full w-1/3 border-r border-base-200 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-x-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Invites</th>
            </tr>
          </thead>
          <tbody>
            {invites.length === 0 ? (
              <tr>
                <td className="text-center">You don't have any invites!</td>
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
                      onClick={() =>
                        handleSelectConversation(invite.conversationId)
                      }
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
                        <div className="font-bold truncate hidden sm:flex">
                          {invite.username}
                        </div>
                        <div className="text-xs opacity-50 truncate text-ellipse"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <table className="table mt-6">
          <thead>
            <tr>
              <th>Sent Invites</th>
            </tr>
          </thead>
          <tbody>
            {sentInvites.length === 0 ? (
              <tr>
                <td className="text-center">You haven't sent any invites!</td>
              </tr>
            ) : (
              sentInvites.map((conversationId, index) => (
                <tr
                  key={conversationId}
                  className={`${
                    selectedConversation === conversationId ? "bg-base-200" : ""
                  } hover:bg-base-100 hover:brightness-90 hover:scale-105 transition-all duration-200`}
                >
                  <td>
                    <div
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => handleSelectConversation(conversationId)}
                      role="button"
                      tabIndex="0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate">
                          Chat {index + 1}
                        </div>
                        <div className="text-xs opacity-50 truncate text-ellipse">
                          {getConversationParticipants(conversationId)}
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
    </div>
  );
};

export default Conversations;
