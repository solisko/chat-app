import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";

const Navbar = () => {
  const { user, avatarSrc, isAuthenticated } = useContext(ChatContext);

  return (
    <div className="sticky top-0 w-full z-50 bg-base-300 shadow-md">
      {/* sticky top-0 z-50 bg-gray-800 text-white p-4 */}
      <div className="navbar container mx-auto h-20">
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
    </div>
  );
};

export default Navbar;
