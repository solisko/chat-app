import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../Context/ChatContextProvider";
import Logout from "./Logout";

const SideNav = ({ isOpen, onClose }) => {
  const { user } = useContext(ChatContext);

  const handleProfileClick = () => {
    onClose();
  };

  return (
    <div
      className={`fixed top-24 right-0 w-80 h-full bg-base-100 transform ${
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
        <Link
          to="/chat/profile"
          className="btn btn-block btn-secondary"
          onClick={handleProfileClick}
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
};
export default SideNav;
