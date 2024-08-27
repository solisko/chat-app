import { useContext } from "react";
import { ChatContext } from "../Context/ChatContextProvider";
import { toast } from "react-toastify";

const DeleteModal = () => {
  const { BASE_URL, user, jwtToken, logout } = useContext(ChatContext);

  const deleteUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${user.userId}`, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      //   console.log("User deleted successfully:", result);
      document.getElementById("my_modal_1").close();
      toast.success("DELETED! Hope to see you back soon...", {
        className: "custom-toast",
      });
      logout();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Really?!</h3>
          <p className="py-4">Are you sure you want to delete your account?</p>
          <div className="modal-action">
            <button
              className="absolute right-4 top-2 text-l font-bold focus:outline-none hover:text-red-400"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              ✕
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={deleteUser}
            >
              Yes
            </button>
            <button
              className="btn btn-active"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default DeleteModal;
