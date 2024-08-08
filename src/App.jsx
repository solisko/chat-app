import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatContextProvider from "./Context/ChatContextProvider";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import Chat from "./Components/Chat";

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
            <Route path="/chat" element={<ProtectedRoute component={Chat} />} />
          </Routes>
        </Router>
      </ChatContextProvider>
    </div>
  );
}

export default App;
