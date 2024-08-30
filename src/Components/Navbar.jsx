import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import SideNav from "./SideNav";
import Avatar from "./Avatar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Invite from "./Invite";

const Navbar = () => {
  const { user, allUsers } = useContext(ChatContext);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "retro");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchRef = useRef(null);
  const darkTheme = "mytheme";

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setIsSideNavOpen((prevState) => !prevState);
  };

  const handleCloseSideNav = () => {
    setIsSideNavOpen(false);
  };

  const handleToggle = (e) => {
    setTheme(e.target.checked ? darkTheme : "retro");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = allUsers
        .filter((u) => u.userId !== user.userId)
        .filter((u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, allUsers, user.userId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="fixed top-0 w-full z-50 bg-base-300 shadow-md">
        <div className="navbar flex items-center justify-between h-24 px-10">
          <div className="flex-1 flex justify-start items-center space-x-4 md:space-x-0">
            <div className="hidden md:flex items-center">
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  className="theme-controller"
                  onChange={handleToggle}
                  checked={theme === darkTheme}
                />
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <button className="btn btn-ghost mx-auto text-xl">chatify</button>
          </div>
          <div className="flex-1 flex justify-end items-center space-x-4">
            <div className="form-control relative" ref={searchRef}>
              <div className="dropdown dropdown-end">
                <div className="relative flex items-center text-gray-400">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute ml-2" />
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    placeholder="Find user to chat with!"
                    className="input input-bordered w-48 md:w-auto pl-8 pr-2 focus:text-gray-600"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    tabIndex={0}
                  />
                </div>
                {filteredUsers.length > 0 && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content bg-base-100 rounded-box z-[1] mt-2 min-w-56 p-2 shadow max-h-96 overflow-y-auto"
                  >
                    {filteredUsers.map((user) => (
                      <li
                        key={user.userId}
                        className="p-2 hover:bg-base-300 rounded flex items-center justify-between overflow-auto"
                      >
                        {user.username}
                        <Invite userId={user.userId} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <button
              onClick={handleAvatarClick}
              className="avatar cursor-pointer"
            >
              <div className="ring-primary ring-offset-base-100 w-12 md:w-16 rounded-full ring ring-offset-2">
                <Avatar
                  avatarUrl={user.avatar}
                  altText={`${user.username}'s avatar`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      {isSideNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={handleCloseSideNav}
        />
      )}
      <SideNav isOpen={isSideNavOpen} onClose={handleCloseSideNav} />
    </div>
  );
};

export default Navbar;
