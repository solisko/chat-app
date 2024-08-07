import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = (props) => {
  const [csrfToken, setCsrfToken] = useState("");
  const [jwtToken, setJwtToken] = useState(
    () => localStorage.getItem("jwtToken") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    setIsAuthenticated(!!jwtToken);
  }, [jwtToken]);

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch("https://chatify-api.up.railway.app/csrf", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error.message);
    }
  };

  const fetchUser = async (token, username) => {
    try {
      const response = await fetch("https://chatify-api.up.railway.app/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      const user = data.find((user) => user.username === username);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.error("User not found for username:", username);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const login = async (token, username) => {
    setJwtToken(token);
    localStorage.setItem("jwtToken", token);
    await fetchUser(token, username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setJwtToken("");
    localStorage.removeItem("jwtToken");
    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <ChatContext.Provider
      value={{
        csrfToken,
        fetchCsrfToken,
        jwtToken,
        isAuthenticated,
        login,
        logout,
        user,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
