import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatContextProvider from "./Context/ChatContextProvider";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import Chat from "./Components/ChatRoom/Chat";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <ChatContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </Router>
      </ChatContextProvider>
    </div>
  );
}

export default App;
