import { createContext } from "react";

export const ChatContext = createContext();

const ChatProvider = (props) => {
  const [csrfToken, setCsrfToken] = useState("");

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch("https://chatify-api.up.railway.app/csrf", {
        method: "PATCH",
        credentials: "include",
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

  return (
    <ChatContext.Provider value={{ fetchCsrfToken }}>
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
