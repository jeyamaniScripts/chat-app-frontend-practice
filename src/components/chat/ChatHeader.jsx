import { FaInfoCircle } from "react-icons/fa";

const ChatHeader = () => {
  return (
    <div className="h-14 border-b border-slate-200 px-4
                    flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white
                        flex items-center justify-center font-semibold">
          G
        </div>

        <div>
          <p className="font-medium text-slate-700">
            Group Chat
          </p>
          <p className="text-xs text-slate-500">
            3 members
          </p>
        </div>
      </div>

      {/* Right */}
      <FaInfoCircle className="text-slate-600 cursor-pointer hover:text-indigo-600 transition" />
    </div>
  );
};

export default ChatHeader;
