import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import Logout from "./Logout";

const SideNav = () => {
  const { user } = useContext(ChatContext);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side fixed top-20 overflow-hidden">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-neutral-content text-base-content min-h-screen w-80">
          <Logout />
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
