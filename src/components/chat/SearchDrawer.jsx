import { FaTimes, FaSearch } from "react-icons/fa";
import UserListItem from "./UserListItem";

const SearchDrawer = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <h2 className="text-lg font-semibold text-slate-700">
            Search Users
          </h2>
          <FaTimes
            className="cursor-pointer text-slate-500 hover:text-slate-700"
            onClick={onClose}
          />
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div
            className="flex items-center gap-2 border border-slate-300 rounded-lg px-3
            focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/30 transition"
          >
            <FaSearch className="text-slate-400" />
            <input
              placeholder="Search by name or email"
              className="w-full p-2 outline-none"
            />
          </div>
        </div>

        {/* Users */}
        <div className="px-4 space-y-2 overflow-y-auto">
          {[1, 2, 3, 4, 5].map((u) => (
            <UserListItem key={u} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchDrawer;
