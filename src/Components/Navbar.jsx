import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";

const Navbar = () => {
  const { user, avatarSrc, isAuthenticated } = useContext(ChatContext);

  return (
    <div className="fixed top-0 w-full z-50 bg-base-300 shadow-md">
      <div className="navbar flex justify-between items-center h-20 px-10">
        <button className="btn btn-ghost text-xl">shut-up</button>
        <div className="ml-auto flex items-center space-x-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-48 md:w-auto"
            />
          </div>
          <label htmlFor="my-drawer-4" className="cursor-pointer">
            <img
              src={avatarSrc}
              alt={`${user.username}'s avatar`}
              className="w-16 h-16 rounded-full object-cover"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
