import { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import UserListItem from "./UserListItem";
import UserChip from "./UserChip";
import API from "../../utils/axios";
import chatAPI from "../../utils/chatAPI";
import { toast } from "react-toastify";
import { socket } from "../../socket";
import { useUser } from "../../context/UserContext";

const CreateGroupModal = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { chats, setChats, setSelectedChat } = useUser();

  useEffect(() => {
    const controller = new AbortController();

    const delay = setTimeout(async () => {
      if (!search.trim()) return;

      try {
        const { data } = await API.get(`?search=${search}`, {
          signal: controller.signal,
        });
        setSearchResults(data);
      } catch (err) {
        if (err.name !== "CanceledError") console.error(err);
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(delay);
    };
  }, [search]);

  const addUser = (user) => {
    if (selectedUsers.find((u) => u._id === user._id)) return;
    setSelectedUsers([...selectedUsers, user]);
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  };

  const createGroupHandler = async () => {
    if (!groupName || selectedUsers.length < 2) return;

    try {
      setLoading(true);

      const { data } = await chatAPI.post("/api/chat/group", {
        name: groupName,
        users: selectedUsers.map((u) => u._id),
      });

      // 🔥 AUTO ADD TO SIDEBAR
      // setChats((prev) => (Array.isArray(prev) ? [data, ...prev] : [data]));

      setSelectedChat(data);

      setGroupName("");
      setSelectedUsers([]);
      setSearch("");
      setSearchResults([]);
      toast.success("group created");
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ⬇️ condition moved here instead
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5 relative">
          <FaTimes
            className="absolute top-4 right-4 text-slate-500 cursor-pointer"
            onClick={onClose}
          />

          <h2 className="text-xl font-semibold text-center text-slate-700 mb-4">
            Create Group Chat
          </h2>

          <input
            placeholder="Group Chat Name"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30 outline-none transition"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 mt-3 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/30 transition">
            <FaSearch className="text-slate-400" />
            <input
              placeholder="Search users"
              className="w-full p-2 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {selectedUsers.map((user) => (
              <UserChip
                key={user._id}
                user={user}
                onRemove={() => removeUser(user)}
              />
            ))}
          </div>

          <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
            {searchResults.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                onClick={() => addUser(user)}
              />
            ))}
          </div>

          <button
            onClick={createGroupHandler}
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Group"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateGroupModal;
