const Conversations = () => {
  return (
      <div className="fixed h-screen w-1/3 border-r border-base-200 flex flex-col overflow-y-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Conversations</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="bg-neutral-content">
              <td>
                <div className="flex items-center gap-6">
                  <div className="avatar">
                      <img src="" alt="" />
                  </div>
                  <div>
                    <div className="font-bold">Username</div>
                    <div className="text-sm opacity-50">Latest msg</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  );
};
export default Conversations;
