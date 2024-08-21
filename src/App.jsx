import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatContextProvider from "./Context/ChatContextProvider";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Chat from "./Components/ChatRoom/Chat";
import Profile from "./Components/Profile";

function App() {
  return (
    <div>
      <ChatContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-center"
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            newestOnTop
            offset="y-10"
          />
        </Router>
      </ChatContextProvider>
    </div>
  );
}

export default App;
