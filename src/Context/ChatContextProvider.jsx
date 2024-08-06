import { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = (props) => {
  const [csrfToken, setCsrfToken] = useState("");
  const [jwtToken, setJwtToken] = useState(
    () => localStorage.getItem("jwtToken") || ""
  );

  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken);

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

  const login = (token) => {
    setJwtToken(token);
    localStorage.setItem("jwtToken", token);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setJwtToken("");
    localStorage.removeItem("jwtToken");
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
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
