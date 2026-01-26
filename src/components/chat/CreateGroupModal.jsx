import { useState } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import UserListItem from "./UserListItem";
import UserChip from "./UserChip";

const CreateGroupModal = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  if (!open) return null;

  // Dummy users (replace with API later)
  const users = [
    { _id: 1, name: "John Doe", email: "john@example.com" },
    { _id: 2, name: "Jane Smith", email: "jane@example.com" },
    { _id: 3, name: "Alex", email: "alex@example.com" },
  ];

  const addUser = (user) => {
    if (selectedUsers.find((u) => u._id === user._id)) return;
    setSelectedUsers([...selectedUsers, user]);
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5 relative">
          {/* Close */}
          <FaTimes
            className="absolute top-4 right-4 text-slate-500 cursor-pointer"
            onClick={onClose}
          />

          <h2 className="text-xl font-semibold text-center text-slate-700 mb-4">
            Create Group Chat
          </h2>

          {/* Group Name */}
          <input
            placeholder="Group Chat Name"
            className="w-full border border-slate-300 rounded-lg px-3 py-2
                       focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30
                       outline-none transition"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          {/* Search */}
          <div
            className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 mt-3
                       focus-within:border-indigo-600 focus-within:ring-2
                       focus-within:ring-indigo-600/30 transition"
          >
            <FaSearch className="text-slate-400" />
            <input
              placeholder="Search users"
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Selected Users */}
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedUsers.map((user) => (
              <UserChip
                key={user._id}
                user={user}
                onRemove={() => removeUser(user)}
              />
            ))}
          </div>

          {/* Search Results */}
          <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
            {users.map((user) => (
              <div key={user._id} onClick={() => addUser(user)}>
                <UserListItem />
              </div>
            ))}
          </div>

          {/* Footer */}
          <button
            className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg
                       hover:bg-indigo-700 transition"
          >
            Create Group
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateGroupModal;
