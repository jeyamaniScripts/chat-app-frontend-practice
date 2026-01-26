const MessageBubble = ({ isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-3 py-2 rounded-lg text-sm
        ${isOwn
          ? "bg-indigo-600 text-white rounded-br-none"
          : "bg-slate-200 text-slate-700 rounded-bl-none"}`}
      >
        Hello, this is a message 👋
      </div>
    </div>
  );
};

export default MessageBubble;
