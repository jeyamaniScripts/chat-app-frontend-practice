import { useState, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import chatAPI from "../../utils/chatAPI";
import { socket } from "../../socket";
import { useUser } from "../../context/UserContext";

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, selectedChat } = useUser();
  const typingTimeout = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      await chatAPI.post("/api/chat/message", {
        chatId,
        content: message,
      });

      setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTyping = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (!selectedChat) return;

    const currentChatId = selectedChat.chatId || selectedChat._id;

    socket.emit("typing", {
      chatId: currentChatId,
      userId: user._id,
      name: user.name,
    });

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", {
        chatId: currentChatId,
        userId: user._id,
      });
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-3 border-t border-slate-200">
      <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3">
        <input
          value={message}
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 p-2 outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="text-indigo-600"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
