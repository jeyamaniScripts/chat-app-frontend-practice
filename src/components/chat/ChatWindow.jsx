import { useEffect, useState, useRef } from "react";
import { useUser } from "../../context/UserContext";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import chatAPI from "../../utils/chatAPI";
import { socket } from "../../socket";

const ChatWindow = ({ typingUser }) => {
  const { selectedChat, user, setNotifications, setChats } = useUser();
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!selectedChat) return;

    const chatId = selectedChat.chatId || selectedChat._id;

    // 🔹 Fetch old messages
    const fetchMessages = async () => {
      try {
        const { data } = await chatAPI.get(`/api/chat/message/${chatId}`);
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    };

    fetchMessages();

    // 🔹 Join socket room ONCE
    socket.emit("join chat", chatId);

    const handleMessage = (msg) => {
      if (String(msg.chatId) !== String(chatId)) return;

      setMessages((prev) => {
        if (prev.some((m) => m.messageId === msg.messageId)) return prev;
        return [...prev, msg];
      });
    };

    socket.on("message received", handleMessage);

    return () => {
      socket.off("message received", handleMessage);
    };
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat) return;

    const chatId = selectedChat.chatId || selectedChat._id;

    const markAsRead = async () => {
      try {
        await chatAPI.put(`/api/chat/${chatId}/read`);

        // ⭐ Update sidebar state instantly
        setChats((prev) =>
          prev.map((chat) =>
            (chat.chatId || chat._id) === chatId
              ? { ...chat, unreadCount: 0 }
              : chat,
          ),
        );
      } catch (err) {
        console.error("Read update failed", err);
      }
    };

    markAsRead();
  }, [selectedChat, setChats]);
  // 🔔 Clear notifications when opening chat
  // useEffect(() => {
  //   if (!selectedChat) return;

  //   const chatId = selectedChat.chatId || selectedChat._id;

  //   setNotifications((prev) => {
  //     const copy = { ...prev };
  //     delete copy[chatId];
  //     return copy;
  //   });
  // }, [selectedChat]);

  // 🔽 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-slate-400">
        Select a chat to start messaging
      </div>
    );
  }

  const chatId = selectedChat.chatId || selectedChat._id;

  return (
    <div className="flex flex-1 min-w-0 bg-white rounded-xl shadow-sm flex-col">
      <ChatHeader chat={selectedChat} />

      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.messageId || msg._id}
            isOwn={String(msg.senderId) === String(user._id)}
            content={msg.content}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {typingUser && typingUser !== user.name && (
        <div className="text-sm text-gray-500 italic px-4 pb-2">
          {typingUser} is typing...
        </div>
      )}

      <MessageInput chatId={chatId} />
    </div>
  );
};

export default ChatWindow;
