import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero bg-base-200 min-h-screen w-full overflow-auto">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">chatify</h1>
          <p className="py-6">
            Connect effortlessly, chat securely - chatify - the ultimate app for all your
            conversations.
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Home;
