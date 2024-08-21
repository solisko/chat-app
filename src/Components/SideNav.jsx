import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const SideNav = ({ isOpen, onClose }) => {
  const { user } = useContext(ChatContext);
  const navigate = useNavigate()

  const handleProfileClick = () => {
    onClose();
    navigate("/profile")
  }

  return (
      <div
        className={`fixed top-24 right-0 w-64 h-full bg-neutral-content transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4">
          <button
            onClick={onClose}
            className="text-2xl focus:outline-none hover:text-red-400"
          >
            &times;
          </button>
          <Logout />
        </div>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-4 ">Hi {user.username}!</h2>
          <button className="btn btn-outline" onClick={handleProfileClick}>Profile</button>
        </div>
      </div>
  );
};
export default SideNav;
