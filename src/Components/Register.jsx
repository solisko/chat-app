import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatContext } from "../Context/ChatContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { csrfToken, uploadAvatar, BASE_URL } = useContext(ChatContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.info("Passwords do not match! Try again.", {
        className: "custom-toast",
      });
      return;
    }
    setLoading(true);
    try {
      let avatarUrl = avatar;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
        setAvatar(avatarUrl);
      }
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          avatar: avatarUrl,
          csrfToken,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Failed to create user. Please try again.",
          {
            className: "custom-toast",
          }
        );
        throw new Error(
          errorData.error || "Failed to create user. Please try again."
        );
      }
      toast.success("Registered successfully! Login time.", {
        className: "custom-toast",
      });
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the account:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <form
          onSubmit={handleRegister}
          className="card-body items-center text-center"
        >
          <h2 className="card-title">Register</h2>
          <div className="form-control">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-ghost w-full max-w-xs"
              autoComplete="off"
              required
            />
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-ghost w-full max-w-xs"
              autoComplete="off"
              required
            />
            <label htmlFor="avatar" className="label">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-ghost w-full max-w-xs"
            />
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-ghost w-full max-w-xs"
              required
              autoComplete="off"
              minLength={6}
            />
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Repeat Password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-ghost w-full max-w-xs"
              required
              autoComplete="off"
              minLength={6}
            />
            <div className="form-control mt-9">
              <button
                className="btn btn-primary"
                type="submit"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <Link to="/" className="btn btn-link">
              Already have an account? Login here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
