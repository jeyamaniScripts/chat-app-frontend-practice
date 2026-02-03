// SearchDrawer.jsx
import { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import UserListItem from "./UserListItem";
import API from "../../utils/axios";
import { useUser } from "../../context/UserContext";
import chatAPI from "../../utils/chatAPI";

const SearchDrawer = ({ open, onClose }) => {
  const { user, setSelectedChat } = useUser();
  const { chats, setChats } = useUser();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchUsers = async () => {
        if (!search.trim() || !user) {
          setUsers([]);
          return;
        }

        try {
          setLoading(true);
          // ✅ FIXED URL
          const { data } = await API.get(`/?search=${search}`);
          setUsers(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, user]);

  const handleAccessChat = async (selectedUser) => {
    try {
      const { data } = await chatAPI.post("/api/chat/access", {
        userId: selectedUser._id,
      });

      const chatId = data.chatId || data._id;

      // 🔥 Add to sidebar if not already present
      const exists = chats.find((c) => (c.chatId || c._id) === chatId);

      if (!exists) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <h2 className="text-lg font-semibold text-slate-700">Search Users</h2>
          <FaTimes
            onClick={onClose}
            className="cursor-pointer text-slate-500"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3">
            <FaSearch className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="w-full p-2 outline-none"
            />
          </div>
        </div>

        <div className="px-4 space-y-2 overflow-y-auto">
          {loading && <p className="text-sm text-slate-400">Searching...</p>}

          {!loading &&
            users.map((u) => (
              <UserListItem key={u._id} user={u} onClick={handleAccessChat} />
            ))}

          {!loading && search && users.length === 0 && (
            <p className="text-sm text-slate-400">No users found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchDrawer;
