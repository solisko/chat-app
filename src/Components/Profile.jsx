import React, { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";

const Profile = () => {
  const { jwtToken, user, logout } = useContext(ChatContext);

  const deleteUser = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(
          `https://chatify-api.up.railway.app/users/${user.userId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        // console.log("User deleted successfully:", result);
        logout();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <div className="">
        <p>Profile of {user.username}</p>
        <p>Id {user.userId}</p>
        <button className="btn" onClick={deleteUser}>
          Delete account
        </button>
      </div>
    </div>
  );
};

export default Profile;
