import { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/react";

const Login = () => {
  const { csrfToken, login, BASE_URL } = useContext(ChatContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          csrfToken,
        }),
      });
      if (!response.ok) {
        let errorMessage = "Login failed. Please try again.";
        if (response.status === 401) {
          errorMessage =
            "Oh darn! Please check your credentials and try again.";
        } else if (response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
        // misslyckad inloggning till Sentry
        Sentry.captureMessage(
          `Failed login attempt for user: ${username}. Error: ${errorMessage}`,
          {
            level: "warning",
            extra: {
              status: response.status,
              username,
              errorMessage,
            },
          }
        );
        toast.error(errorMessage, {
          className: "custom-toast",
        });
        return;
      }
      const data = await response.json();
      await login(data.token);
      // lyckat inloggning till Sentry
      Sentry.captureMessage(`Successful login for user: ${username}`, {
        level: "info",
        extra: {
          username,
        },
      });
      toast.success("👋 Hey you. Welcome to the chat...", {
        className: "custom-toast",
      });
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    } catch (error) {
      Sentry.captureException(error);
      toast.error("An unexpected error occurred. Please try again later.", {
        className: "custom-toast",
      });
      console.error("There was an error logging in:", error.message);
    } finally {
      setLoading(false);
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
              autoComplete="off"
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
              autoComplete="current-password"
              required
            />
            <div className="form-control mt-9">
              <button
                className="btn btn-primary"
                type="submit"
                // disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <Link to="/register" className="btn btn-link">
              Don't have an account? Register here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
