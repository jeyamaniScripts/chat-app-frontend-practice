import { FaPaperPlane } from "react-icons/fa";

const MessageInput = () => {
  return (
    <div className="p-3 border-t border-slate-200">
      <div
        className="flex items-center gap-2 border border-slate-300 rounded-lg px-3
                   focus-within:border-indigo-600
                   focus-within:ring-2 focus-within:ring-indigo-600/30
                   transition"
      >
        <input
          placeholder="Type a message..."
          className="flex-1 p-2 outline-none"
        />

        <button
          className="text-indigo-600 hover:text-indigo-700 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
