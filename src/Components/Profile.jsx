import { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "./Avatar";

const Profile = () => {
  const { jwtToken, user, logout, BASE_URL, uploadAvatar, setUser } =
    useContext(ChatContext);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let avatarUrl = avatar;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
        setAvatar(avatarUrl);
      }

      const response = await fetch(`${BASE_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          userId: user.userId,
          updatedData: {
            username: username,
            email: email,
            avatar: avatarUrl,
          },
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
      const updatedUser = {
        ...user,
        username: username,
        email: email,
        avatar: avatarUrl,
      };
      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Updated successfully! Get back to chatting!", {
        className: "custom-toast",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(`${BASE_URL}/users/${user.userId}`, {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log("User deleted successfully:", result);
        toast.success("DELETED! Hope to see you back soon...", {
          className: "custom-toast",
        });
        logout();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
<div className="flex justify-center items-center h-full w-full">
      <div className="bg-base-200 shadow-xl relative p-6 rounded-lg max-w-lg w-full">
        <button
          className="absolute top-2 right-5 text-2xl focus:outline-none hover:text-red-400"
          onClick={() => navigate("/chat")}
        >
          &times;
        </button>
        <form className="card-body" onSubmit={updateUser}>
          <h1 className="card-title text-center mb-6">
            Update {user.username}'s user info
          </h1>
          <div className="flex items-center mb-6 justify-center">
            <div className="avatar w-52 h-52 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
              <Avatar
                avatarUrl={avatarPreview}
                altText={`${user.username}'s avatar`}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">Change avatar</label>
            <input
              type="file"
              className="file-input input-bordered w-full"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <label className="label">Change username</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder={user.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="label">Change email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder={user.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
          <button
            type="button"
            className="btn btn-error mt-4"
            onClick={deleteUser}
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
