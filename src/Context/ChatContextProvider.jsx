import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

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
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
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
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [sentInvites, setSentInvites] = useState([]);

  const resetState = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  useEffect(() => {
    if (jwtToken && isTokenExpired(jwtToken)) {
      handleLogout();
    }
  }, [jwtToken]);

  useEffect(() => {
    setIsAuthenticated(!!jwtToken);
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

  const handleLogout = () => {
    toast("Your session has expired. Please log in again.", {
      className: "custom-toast",
    });
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
      // console.log("Fetched messages:", data);
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error.message);
    }
  };

  const fetchSentInvites = async () => {
    try {
      const response = await fetch(`${BASE_URL}/conversations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }
      const data = await response.json();
      // console.log("Fetched conversationIds:", data);
      setSentInvites(data);
    } catch (error) {
      console.error("Failed to fetch conversations:", error.message);
    }
  };

  const fetchNewInvites = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${user.userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      if (data.length > 0) {
        const fetchedInvites = JSON.parse(data[0].invite);
        // console.log("Fetched invites:", fetchedInvites);
          setUser((prevUser) => {
          const updatedUser = {
            ...prevUser,
            invite: fetchedInvites,
          };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
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

      // const userMap = {};
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
      fetchSentInvites()
      fetchNewInvites()
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

  const login = async (token) => {
    setJwtToken(token);
    localStorage.setItem("jwtToken", token);
    const userData = decodeToken(token);
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
      resetState();
    } else {
      console.error("Failed to decode user data from token");
    }
  };

  const logout = () => {
    setJwtToken("");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    localStorage.removeItem("invitedUsers");
    setUser(null);
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
        handleLogout,
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
        sentInvites,
        fetchSentInvites,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
