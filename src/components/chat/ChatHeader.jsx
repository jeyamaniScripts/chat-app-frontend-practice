import { useUser } from "../../context/UserContext";

const ChatHeader = ({ chat }) => {
  const { user } = useUser();
  if (!chat) return null;

  const isGroup = chat.isGroupChat;

  const otherUser =
    !isGroup && Array.isArray(chat.users)
      ? chat.users.find((u) => u._id !== user._id)
      : null;

  return (
    <div className="h-14 border-b px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
          {isGroup
            ? chat.chatName?.charAt(0).toUpperCase()
            : otherUser?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <p className="font-medium text-slate-700">
          {isGroup ? chat.chatName : otherUser?.name || "User"}
        </p>
      </div>
    </div>
  );
};
export default ChatHeader;
