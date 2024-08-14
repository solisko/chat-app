import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";

const Navbar = () => {
  const { user, avatarSrc, isAuthenticated } = useContext(ChatContext);

  return (
    <div>
      <div className="navbar bg-base-300 fixed top-0 left-0 w-full z-40">
        <button className="btn btn-ghost text-xl">shut-up</button>
        {isAuthenticated && (
          <div className="ml-auto flex items-center space-x-4">
            <span>{user?.username || "Anonymous"}</span>
            <label htmlFor="my-drawer-4" className="cursor-pointer">
              <img
                src={avatarSrc}
                alt={`${user.username}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
            </label>
          </div>
        )}
      </div>
      {/* Spacer to prevent content overlap */}
      <div className="h-10"></div>
    </div>
  );
};
export default Navbar;
