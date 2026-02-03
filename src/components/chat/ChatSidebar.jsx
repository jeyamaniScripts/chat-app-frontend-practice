import { useEffect, useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import chatAPI from "../../utils/chatAPI";
import { useUser } from "../../context/UserContext";

const ChatSidebar = () => {
  const [openGroup, setOpenGroup] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    chats,
    setChats,
    selectedChat,
    notifications,
    setSelectedChat,
    user,
  } = useUser();
  console.log(chats);

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await chatAPI.get("/api/chat");
  //       setChats(Array.isArray(data.chats) ? data.chats : []);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchChats();
  // }, [setChats]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const { data } = await chatAPI.get("/api/chat");

        setChats((prev) => (prev && prev.length ? prev : data.chats || []));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [selectedChat]); //  ONLY ON FIRST LOAD

  return (
    <>
      <div className="w-64 lg:w-72 xl:w-80 shrink-0 bg-white rounded-xl shadow-sm p-3 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-700">My Chats</h2>
          <button
            onClick={() => setOpenGroup(true)}
            className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
          >
            + New Group
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {loading && (
            <p className="text-sm text-slate-400">Loading chats...</p>
          )}

          {!loading &&
            chats?.map((chat) => {
              const id = chat.chatId || chat._id;
              const selectedId = selectedChat?.chatId || selectedChat?._id;

              const otherUser =
                !chat.isGroupChat &&
                chat.users?.find((u) =>
                  typeof u === "object" ? u._id !== user._id : u !== user._id,
                );

              return (
                <div
                  key={id}
                  onClick={() => setSelectedChat(chat)}
                  className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
                    selectedId === id
                      ? "bg-indigo-100"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  <span>
                    {chat.isGroupChat
                      ? chat.chatName
                      : otherUser?.name || "Private Chat"}
                  </span>

                  {/* 🔴 UNREAD BADGE */}
                  {chat.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <CreateGroupModal open={openGroup} onClose={() => setOpenGroup(false)} />
    </>
  );
};

export default ChatSidebar;
