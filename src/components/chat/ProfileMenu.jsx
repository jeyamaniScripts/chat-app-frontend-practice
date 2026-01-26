import { FaUser, FaSignOutAlt } from "react-icons/fa";

const ProfileMenu = ({ open, onClose, onProfile, onLogout }) => {
  if (!open) return null;

  return (
    <>
      {/* Click outside overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div
        className="absolute right-4 top-14 w-44 bg-white rounded-lg shadow-lg z-50
                   border border-slate-200"
      >
        <button
          onClick={onProfile}
          className="w-full flex items-center gap-2 px-4 py-2
                     text-slate-700 hover:bg-slate-100 transition"
        >
          <FaUser className="text-indigo-600" />
          My Profile
        </button>

        <hr />

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-4 py-2
                     text-red-600 hover:bg-red-50 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfileMenu;
