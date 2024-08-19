import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import Logout from "./Logout";

const SideNav = ({ isOpen, onClose }) => {
  const { user } = useContext(ChatContext);

  return (
    <div
      className={`fixed top-24 right-0 w-64 h-full bg-neutral-content transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out shadow-lg z-50`}
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
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Sidebar Content</h2>
        <ul className="menu w-full">
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideNav;
