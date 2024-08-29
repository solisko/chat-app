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

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById(“app”);
const root = createRoot(container);
root.render(<App />);

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
      {/* <button style={{ border: '5px solid white' }} onClick={() => methodDoesNotExist()}>Break the world</button> */}
    </div>
  );
}

export default App;
