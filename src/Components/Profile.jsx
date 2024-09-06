import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "./Avatar";
import DeleteModal from "./DeleteModal";

const Profile = () => {
  const { jwtToken, user, BASE_URL, uploadAvatar, setUser } =
    useContext(ChatContext);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const fileInputRef = useRef(null);

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

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const hasChanges = () => {
    return (
      username !== user.username ||
      email !== user.email ||
      avatar !== user.avatar ||
      avatarFile !== null
    );
  };

  useEffect(() => {
    setIsButtonDisabled(!hasChanges());
  }, [username, email, avatarFile]);

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

  return (
    <div className="card bg-base-200 min-w-[400px] p-4 h-full">
      <div className="flex items-center justify-center mb-6 relative">
        <h1 className="text-xl font-bold mt-4">Update your account</h1>
        <button
          className=" absolute top-0 right-2 text-l font-bold focus:outline-none hover:text-red-400"
          onClick={() => navigate("/chat")}
        >
          ✕
        </button>
      </div>
      <form className="card-body" onSubmit={updateUser}>
        <div className="flex items-center mb-6 justify-center">
          <div
            className="avatar cursor-pointer w-52 h-52 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2"
            onClick={handleAvatarClick}
          >
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
            ref={fileInputRef}
            className="file-input input-bordered w-full cursor-pointer"
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
          <div className="flex gap-6">
            <button
              type="submit"
              className="btn btn-secondary flex-1"
              disabled={loading || isButtonDisabled}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              className="btn btn-error flex-1"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Delete Account
            </button>
          </div>
        </div>
      </form>
      <DeleteModal />
    </div>
  );
};

export default Profile;
