import { useState, useEffect } from "react";
import ChatNavbar from "../components/chat/ChatNavbar";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import SearchDrawer from "../components/chat/SearchDrawer";
import { socket } from "../socket";

const ChatPage = () => {
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo?.token) {
      console.log("No token found");
      return;
    }

    socket.auth = { token: userInfo.token };

    // 👇 attach listeners BEFORE connect
    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Auth error:", err.message);
    });

    socket.on("receive_message", (data) => {
      console.log("📩 Received:", data);
    });

    socket.connect(); // CONNECT LAST

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <ChatNavbar onOpenSearch={() => setOpenSearch(true)} />

      <div className="flex flex-1 overflow-hidden p-3 gap-3">
        <ChatSidebar />
        <ChatWindow />
      </div>

      <SearchDrawer open={openSearch} onClose={() => setOpenSearch(false)} />
    </div>
  );
};

export default ChatPage;
