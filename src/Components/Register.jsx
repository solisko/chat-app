import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatContext } from "../Context/ChatContextProvider";

const Register = () => {
  const { csrfToken, fetchCsrfToken } = useContext(ChatContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=869d77440f66db77da4ba88f816f8aa7",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      return data.data.url;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let avatarUrl = avatar;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
        setAvatar(avatarUrl);
      }

      const response = await fetch(
        "https://chatify-api.up.railway.app/auth/register",
        {
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
        }
      );
      let errorMsg;
      if (!response.ok) {
        try {
          const errorData = await response.json();
          errorMsg = errorData.message;
        } catch (jsonError) {
          errorMsg = await response.text();
        }

        throw new Error(errorMsg || "Failed to create user");
      }
      alert(
        "Registered successfully! You are being redirected to the login page."
      );
      navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error("There was an error creating the account:", error.message);
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
            />
            <div className="form-control mt-9">
              <button
                className="btn btn-primary transition duration-200 ease-in-out hover:bg-primary"
                type="submit"
              >
                Register
              </button>
            </div>
            <Link to="/" className="btn btn-link">
              Already have an account? Login here!
            </Link>
          </div>
        </form>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default Register;
