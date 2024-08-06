import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <h1>Login</h1>
      <form>
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
    </div>
  );
};
export default Login;
