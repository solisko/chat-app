import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { Link, useNavigate } from "react-router-dom";

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
      // console.log("Received token:", data.token);
      await login(data.token);
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
    <div className="flex justify-center">
      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <form
          onSubmit={handleLogin}
          className="card-body items-center text-center"
        >
          <h2 className="card-title">Login</h2>
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
              autoComplete="username"
              required
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
                Login
              </button>
            </div>
            <Link to="/register" className="btn btn-link">
              Don't have an account? Register here!
            </Link>
          </div>
        </form>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default Login;
