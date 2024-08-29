import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

let uuid = self.crypto.randomUUID();
// console.log(uuid);

export const ChatContext = createContext();

const BASE_URL = import.meta.env.VITE_CHATIFY_URL;

const ChatProvider = (props) => {
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      // console.log("Decoded Token:", decoded);
      return {
        userId: decoded.id,
        username: decoded.user,
        email: decoded.email,
        avatar: decoded.avatar,
        invite: decoded.invite,
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    return exp < Date.now() / 1000;
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
  const [userMap, setUserMap] = useState({});
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const resetState = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  useEffect(() => {
    if (jwtToken && isTokenExpired(jwtToken)) {
      handleLogout(false);
    }
  }, [jwtToken]);

  useEffect(() => {
    setIsAuthenticated(!!jwtToken);
    if (jwtToken) {
      startLogoutTimer();
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, [jwtToken]);

  useEffect(() => {
    fetch(`${BASE_URL}/csrf`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token");
        }
        return response.json();
      })
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((error) =>
        console.error("Error fetching CSRF token:", error.message)
      );
  }, []);

  const startLogoutTimer = () => {
    clearTimeout(logoutTimer);
    const logoutTime = 30 * 60 * 1000; // 30 min
    const newLogoutTimer = setTimeout(() => {
      handleLogout(true);
    }, logoutTime);
    setLogoutTimer(newLogoutTimer);
  };

  const handleLogout = (showToast = false) => {
    if (showToast) {
      toast("You gone? Seems like it. Logging you out.", {
        className: "custom-toast",
      });
    }
    logout();
  };

  const fetchMessagesWithUserId = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/messages?userId=${user.userId}`,
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

  const fetchMessagesWithConversationId = async (conversationId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/messages?conversationId=${conversationId}`,
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
      console.log("Fetched messages:", data);
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
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

      const userMap = {};
      data.forEach((user) => {
        userMap[user.userId] = user;
        userMap[user.username] = user;
      });
      setUserMap(userMap);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUserById = (userId) => userMap[userId] || null;

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllUsers();
    }
  }, [isAuthenticated]);

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=869d77440f66db77da4ba88f816f8aa7",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      return data.data.url;
    } catch (error) {
      toast.error("Error uploading avatar: " + error.message, {
        className: "custom-toast",
      });
      throw error;
    }
  };
  // const inviteUserToChat = async () => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/invite/719`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${jwtToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           conversationId: "ac2cacc8-60b9-4699-9a67-45164a009986",
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to send invite");
  //     }
  //     const data = await response.json();
  //     console.log("Invite sent successfully:", data);
  //   } catch (error) {
  //     console.error("Error inviting user:", error);
  //   }
  // };

  const login = async (token) => {
    setJwtToken(token);
    localStorage.setItem("jwtToken", token);

    const userData = decodeToken(token);
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
      resetState();
      startLogoutTimer();
    } else {
      console.error("Failed to decode user data from token");
    }
  };

  const logout = () => {
    clearTimeout(logoutTimer);
    setJwtToken("");
    localStorage.removeItem("jwtToken");
    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    resetState();
  };

  return (
    <ChatContext.Provider
      value={{
        csrfToken,
        jwtToken,
        isTokenExpired,
        isAuthenticated,
        login,
        logout,
        user,
        setUser,
        fetchMessagesWithUserId,
        fetchMessagesWithConversationId,
        messages,
        fetchAllUsers,
        allUsers,
        selectedConversation,
        setSelectedConversation,
        getUserById,
        BASE_URL,
        uploadAvatar,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
