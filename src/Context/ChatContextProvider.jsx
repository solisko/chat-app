import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import defaultAvatar from "../assets/img/astronaut.png";
import { toast } from "react-toastify";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

let uuid = self.crypto.randomUUID();
// console.log(uuid);

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
        invite: decoded.invite,
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const [jwtToken, setJwtToken] = useState(
    () => localStorage.getItem("jwtToken") || ""
  );
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem("jwtToken");
    if (savedToken) {
      return decodeToken(savedToken);
    }
    return null;
  });
  const [csrfToken, setCsrfToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    setIsAuthenticated(!!jwtToken);
    if (jwtToken) {
      startLogoutTimer();
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, [jwtToken]);

  const startLogoutTimer = () => {
    clearTimeout(logoutTimer);
    const logoutTime = 30 * 60 * 1000;
    const newLogoutTimer = setTimeout(() => {
      handleLogout();
    }, logoutTime);
    setLogoutTimer(newLogoutTimer);
  };

  const handleLogout = () => {
    toast("You gone? Seems like it. Logging out.", {
      className: "custom-toast",
    });
    setTimeout(() => {
      logout();
    }, 1000);
  };

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
        `https://chatify-api.up.railway.app/messages?conversationId=2deeb52a-8b97-47a1-9c14-e4ec1e167ef9`,
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

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("https://chatify-api.up.railway.app/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const inviteUserToChat = async () => {
    try {
      const response = await fetch(
        `https://chatify-api.up.railway.app/invite/384`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationId: "2deeb52a-8b97-47a1-9c14-e4ec1e167ef9",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send invite");
      }
      const data = await response.json();
      console.log("Invite sent successfully:", data);
    } catch (error) {
      console.error("Error inviting user:", error);
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
      startLogoutTimer(); // Starta logout-timern vid inloggning
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
    clearTimeout(logoutTimer);
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
        inviteUserToChat,
        fetchAllUsers,
        allUsers,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
