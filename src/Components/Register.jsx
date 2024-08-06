import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../Context/ChatContextProvider";

const Register = () => {
  const { fetchCsrfToken } = useContext(ChatContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  //   const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await fetch("https://chatify-api.up.railway.app/csrf", {
  //         method: "PATCH",
  //         credentials: "include",
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch CSRF token");
  //       }
  //       const data = await response.json();
  //       setCsrfToken(data.csrfToken);
  //     } catch (error) {
  //       console.error("Failed to fetch CSRF token:", error.message);
  //     }
  //   };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://chatify-api.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken,
          },
          body: JSON.stringify({
            username,
            password,
            email,
            avatar,
          }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message || "Failed to create user");
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
    <div>
      <h1>Register account</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="">Avatar</label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          id="pssword"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default Register;
