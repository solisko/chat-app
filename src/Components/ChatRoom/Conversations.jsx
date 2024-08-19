import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContextProvider";

const Conversations = () => {
  const { user, allUsers } = useContext(ChatContext);

  let invites = [];

  if (user.invite !== null) {
    try {
      invites = JSON.parse(user.invite);
    } catch (error) {
      console.error("Failed to parse invites:", error);
    }
  }
  
  return (
    <div className="fixed h-screen w-1/3 border-r border-base-200 flex flex-col overflow-y-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Conversations</th>
          </tr>
        </thead>
        <tbody>
          {invites.length === 0 ? (
            <tr className="bg-neutral-content">
              <td className="text-center">You don't have any conversations</td>
            </tr>
          ) : (
            invites.map((invite) => {
              const matchingUser = allUsers.find(
                (u) => u.username === invite.username
              );

              return (
                <tr className="bg-neutral-content" key={invite.conversationId}>
                  <td>
                    <div className="flex items-center gap-6">
                      <div className="avatar w-14">
                        <img
                          src={
                            matchingUser?.avatar || "path/to/default/avatar.png"
                          }
                          alt="Avatar"
                          className="rounded-full"
                        />
                      </div>
                      <div>
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
