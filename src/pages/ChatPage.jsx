import { useEffect, useState, useRef } from "react";
import ChatNavbar from "../components/chat/ChatNavbar";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import SearchDrawer from "../components/chat/SearchDrawer";
import { socket } from "../socket";
import { useUser } from "../context/UserContext";

const ChatPage = () => {
  const { user, setChats, selectedChat, setSelectedChat, setNotifications } =
    useUser();
  const [openSearch, setOpenSearch] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  const selectedChatRef = useRef(null);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  /* ================= SOCKET CONNECT ================= */
  useEffect(() => {
    if (!user?.token) return;

    if (!socket.connected) {
      socket.auth = { token: user.token };
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    return () => socket.off("connect");
  }, [user?.token]);

  /* ================= REALTIME EVENTS ================= */
  useEffect(() => {
    const getId = (obj) => String(obj.chatId || obj._id);

    const handlePrivateChat = (chat) => {
      setChats((prev) => {
        if (prev.some((c) => getId(c) === getId(chat))) return prev;
        return [chat, ...prev];
      });
    };

    const handleGroupCreated = (group) => {
      setChats((prev) => {
        if (prev.some((c) => getId(c) === getId(group))) return prev;
        return [group, ...prev];
      });
      setSelectedChat(group);
    };

    const handleMessage = (message) => {
      const currentChatId =
        selectedChatRef.current?.chatId || selectedChatRef.current?._id;

      // if (String(message.chatId) !== String(currentChatId)) {
      //   setNotifications((prev) => ({
      //     ...prev,
      //     [message.chatId]: (prev[message.chatId] || 0) + 1,
      //   }));
      // }

      setChats((prevChats) => {
        const index = prevChats.findIndex(
          (c) => getId(c) === String(message.chatId),
        );
        if (index === -1) return prevChats;

        const updatedChat = { ...prevChats[index], latestMessage: message };
        const newChats = prevChats.filter((_, i) => i !== index);
        return [updatedChat, ...newChats];
      });
    };

    socket.on("private_chat_created", handlePrivateChat);
    socket.on("group_created", handleGroupCreated);
    socket.on("message received", handleMessage);

    return () => {
      socket.off("private_chat_created", handlePrivateChat);
      socket.off("group_created", handleGroupCreated);
      socket.off("message received", handleMessage);
    };
  }, [setChats, setNotifications, setSelectedChat]); // ✅ stable deps

  /* ================= TYPING ================= */
  useEffect(() => {
    const typingHandler = ({ name }) => setTypingUser(name);
    const stopHandler = () => setTypingUser(null);

    socket.on("typing", typingHandler);
    socket.on("stopTyping", stopHandler);

    return () => {
      socket.off("typing", typingHandler);
      socket.off("stopTyping", stopHandler);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <ChatNavbar onOpenSearch={() => setOpenSearch(true)} />

      <div className="flex flex-1 overflow-hidden p-3 gap-3">
        <ChatSidebar />
        <ChatWindow typingUser={typingUser} />
      </div>

      <SearchDrawer open={openSearch} onClose={() => setOpenSearch(false)} />
    </div>
  );
};

export default ChatPage;
