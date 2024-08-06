import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatContextProvider from "./Context/ChatContextProvider";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <div>
      <ChatContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </ChatContextProvider>
    </div>
  );
}

export default App;
