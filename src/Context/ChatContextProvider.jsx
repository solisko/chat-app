import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import defaultAvatar from "../assets/img/astronaut.png";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const ChatContext = createContext();

const ChatProvider = (props) => {

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      // console.log("Decoded Token:", decoded);

      return {
        userId: decoded.id,
        username: decoded.user,
        avatar: decoded.avatar,
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const [csrfToken, setCsrfToken] = useState("");
  const [jwtToken, setJwtToken] = useState(
    () => localStorage.getItem("jwtToken") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken);
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem("jwtToken");
    if (savedToken) {
      return decodeToken(savedToken);
    }
    return null;
  });
  const [messages, setMessages] = useState([]);

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

  // const fetchMessages = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://chatify-api.up.railway.app/messages?userId=${user.userId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch messages");
  //     }

  //     const data = await response.json();
  //     // console.log("Fetched messages:", data);
  //     setMessages(data);
  //   } catch (error) {
  //     console.error("Failed to fetch messages:", error.message);
  //   }
  // };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://chatify-api.up.railway.app/messages?conversationId=3fa85f64-5717-4562-b3fc-2c963f66afa6`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      // console.log("Fetched messages:", data);
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error.message);
    }
  };

  const login = async (token) => {
    setJwtToken(token);
    localStorage.setItem("jwtToken", token);

    const userData = decodeToken(token);
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
    } else {
      console.error("Failed to decode user data from token");
    }
  };

  const logout = () => {
    setJwtToken("");
    localStorage.removeItem("jwtToken");
    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const avatarSrc =
    user?.avatar && isValidUrl(user.avatar) ? user.avatar : defaultAvatar;

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
        avatarSrc,
        fetchMessages,
        messages,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
