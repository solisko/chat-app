import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";
import Avatar from "../Avatar";

const Conversations = () => {
  const { user, allUsers, setSelectedConversation } = useContext(ChatContext);

  let invites = [];

  if (user.invite !== null) {
    try {
      invites = JSON.parse(user.invite);
    } catch (error) {
      console.error("Failed to parse invites:", error);
    }
  }

  const handleSelectConversation = (invite) => {
    setSelectedConversation(invite.conversationId);
  };

  return (
    <div className="fixed h-screen w-1/3 border-r border-base-200 flex flex-col overflow-y-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Chats</th>
          </tr>
        </thead>
        <tbody>
          {invites.length === 0 ? (
            <tr className="bg-neutral-content">
              <td className="text-center">You don't have any conversations!</td>
            </tr>
          ) : (
            invites.map((invite) => {
              const matchingUser = allUsers.find(
                (u) => u.username === invite.username
              );

              return (
                <tr className="bg-neutral-content" key={invite.conversationId}>
                  <td>
                    <div
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => handleSelectConversation(invite)}
                      role="button"
                      tabIndex="0"
                    >
                      <div className="avatar flex-shrink-0 w-14 h-14 rounded-full overflow-hidden ">
                        <Avatar
                          avatarUrl={matchingUser?.avatar}
                          altText={`${invite.username}'s avatar`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold">{invite.username}</div>
                        <div className="text-sm opacity-50">Latest msg</div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Conversations;
