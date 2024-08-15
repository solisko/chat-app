import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { csrfToken, fetchCsrfToken, login } = useContext(ChatContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        const errorData = await response.json();
        toast.error(
          errorData.error ||
            "Login failed. Please check your credentials and try again.",
          {
            className: "custom-toast",
            ariaLive: "assertive",
          }
        );
        return;
      }
      const data = await response.json();
      await login(data.token);
      toast.success("Login successful! Redirecting to chat...", {
        className: "custom-toast",
      });
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    } catch (error) {
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
              autoComplete="current-password"
              required
            />
            <div className="form-control mt-9">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
