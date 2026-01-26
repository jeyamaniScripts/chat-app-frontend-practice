import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  return (
    <div className="hidden md:flex flex-1 bg-white rounded-xl shadow-sm flex-col">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50">
        <MessageBubble />
        <MessageBubble isOwn />
        <MessageBubble />
        <MessageBubble isOwn />
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
