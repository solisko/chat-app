import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    // Login under
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Welcome to Shut-Up! the chat-app
          </h1>
          <p className="py-6"></p>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Home;

// login till vänster
// <div className="hero bg-base-200 min-h-screen">
//   <div className="hero-content flex-col lg:flex-row-reverse">
//     <div className="text-center lg:text-left">
//       <h1 className="text-5xl font-bold">Login now!</h1>
//       <p className="py-6">
//         Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//         excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
//         a id nisi.
//       </p>
//     </div>
//     <Outlet />
//   </div>
// </div>
