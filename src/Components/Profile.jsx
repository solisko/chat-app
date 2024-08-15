import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";

const Profile = () => {
  const { user } = useContext(ChatContext);

  return (
    <div>
      <div>
        <p>Profile of {user.username}</p>
      </div>
    </div>
  );
};
export default Profile;
