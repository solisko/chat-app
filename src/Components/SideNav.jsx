import Logout from "./Logout";

const SideNav = () => {
  return (
    <div className="drawer drawer-end z-30">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        
      </div>
      <div className="drawer-side mt-20">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-screen w-80 p-4">
          <Logout />
          <li>
            <a>Sidebar Item 1</a>
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
