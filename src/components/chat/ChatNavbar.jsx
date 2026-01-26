import { useState } from "react";
import { FaSearch, FaBell, FaUserCircle, FaChevronDown } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import ProfileModal from "./ProfileModal";
import { useUser } from "../../context/UserContext";

const ChatNavbar = ({ onOpenSearch }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { user, setUser } = useUser(); // 🔥 context

  const logoutHandler = () => {
    setUser(null); // clears context + localStorage
    window.location.href = "/";
  };

  return (
    <div className="relative h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4">
      {/* Search */}
      <div
        className="flex items-center gap-2 text-slate-600 cursor-pointer hover:text-indigo-600 transition"
        onClick={onOpenSearch}
      >
        <FaSearch />
        <span className="text-sm font-medium">Search User</span>
      </div>

      <h1 className="text-xl font-bold text-indigo-600">lovable</h1>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <FaBell className="text-slate-600 cursor-pointer" />

        {/* Account + Dropdown */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {user?.pic ? (
            <img
              src={user.pic}
              alt="user"
              className="w-8 h-8 rounded-full object-cover border border-slate-300"
            />
          ) : (
            <FaUserCircle className="text-2xl text-slate-600" />
          )}

          <FaChevronDown
            className={`text-sm text-slate-500 transition-transform ${
              openMenu ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        <ProfileMenu
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          onProfile={() => {
            setOpenMenu(false);
            setOpenProfile(true);
          }}
          onLogout={logoutHandler}
        />
      </div>

      {/* Profile Modal */}
      <ProfileModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        user={user}
      />
    </div>
  );
};

export default ChatNavbar;
