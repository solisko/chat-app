import { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import SideNav from "./SideNav";
import Avatar from "./Avatar";

const Navbar = () => {
  const { user } = useContext(ChatContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="fixed top-0 w-full z-50 bg-base-300 shadow-md">
      <div className="navbar flex justify-between items-center h-24 px-10">
        <button className="btn btn-ghost text-xl">shut-up</button>
        <div className="ml-auto flex items-center space-x-4">
          <div className="form-control">
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="input input-bordered w-48 md:w-auto"
            />
          </div>
          <div onClick={handleAvatarClick} className="avatar cursor-pointer">
            <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
              <Avatar
                avatarUrl={user.avatar}
                altText={`${user.username}'s avatar`}
              />
            </div>
          </div>
        </div>
      </div>
      <SideNav isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
    </div>
  );
};

export default Navbar;
