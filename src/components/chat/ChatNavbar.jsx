import { useState } from "react";
import { FaSearch, FaBell, FaUserCircle, FaChevronDown } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import ProfileModal from "./ProfileModal";
import { useUser } from "../../context/UserContext";

const ChatNavbar = ({ onOpenSearch }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const { user, setUser, chats } = useUser();

  // // 🔔 TOTAL UNREAD COUNT (object → number)
  // const totalUnread = Object.values(notifications).reduce(
  //   (sum, count) => sum + count,
  //   0,
  // );
  const totalUnread = chats.reduce(
    (sum, chat) => sum + (chat.unreadCount || 0),
    0,
  );

  const logoutHandler = () => {
    setUser(null);
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
        {/* 🔔 Bell */}
        <div className="relative cursor-pointer">
          <FaBell className="text-slate-600" />

          {totalUnread > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalUnread}
            </span>
          )}
        </div>

        {/* Account */}
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
