import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

const ChatSidebar = () => {
  const [openGroup, setOpenGroup] = useState(false);

  return (
    <>
      <div className="w-full md:w-[30%] bg-white rounded-xl shadow-sm p-3 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-700">
            My Chats
          </h2>

          <button
            onClick={() => setOpenGroup(true)}
            className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm
                       hover:bg-indigo-700 transition"
          >
            + New Group
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {[1, 2, 3].map((chat) => (
            <div
              key={chat}
              className="p-3 bg-slate-100 rounded-lg cursor-pointer
                         hover:bg-slate-200 transition"
            >
              Group Chat
            </div>
          ))}
        </div>
      </div>

      <CreateGroupModal
        open={openGroup}
        onClose={() => setOpenGroup(false)}
      />
    </>
  );
};

export default ChatSidebar;
