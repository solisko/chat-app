import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import Logout from "./Logout";

const SideNav = ({ isOpen, onClose }) => {
  const { user } = useContext(ChatContext);
  const sideNavRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        sideNavRef.current &&
        !sideNavRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        ref={sideNavRef}
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
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-4 ">Hi {user.username}!</h2>
          <button className="btn btn-outline">Profile</button>
        </div>
      </div>
    </>
  );
};
export default SideNav;
