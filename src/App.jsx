import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatContextProvider from "./Context/ChatContextProvider";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Chat from "./Components/ChatRoom/Chat";
import Profile from "./Components/Profile";
import ShowSendMsg from "./Components/ChatRoom/ShowSendMsg";
import * as Sentry from "@sentry/react";
// import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    // Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  profilesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

function App() {
  return (
    <div>
      <ChatContextProvider>
        {/* <button onClick={() => methodDoesNotExist()}>Break the world</button>; */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/chat" element={<Chat />}>
                <Route index element={<ShowSendMsg />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer
            position="top-center"
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            newestOnTop
          />
        </Router>
      </ChatContextProvider>
    </div>
  );
}

export default App;
