import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { csrfToken, fetchCsrfToken, login } = useContext(ChatContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://chatify-api.up.railway.app/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            csrfToken,
          }),
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid credentials");
        } else {
          const errorMsg = await response.json();
          setError(errorMsg.message || "Failed to login");
        }
        return;
      }
      const data = await response.json();
      console.log("Received token:", data.token);
      await login(data.token, username);
      alert("Login successfully! You are being redirected to the chat page.");
      navigate("/chat");
    } catch (error) {
      setError(error.message);
      console.error(
        "There was an error logging in to the account:",
        error.message
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default Login;
