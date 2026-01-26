import { FaTimes } from "react-icons/fa";

const ProfileModal = ({ open, onClose, user }) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 relative">
          {/* Close */}
          <FaTimes
            className="absolute top-4 right-4 text-slate-500 cursor-pointer
                       hover:text-slate-700"
            onClick={onClose}
          />

          {/* Title */}
          <h2 className="text-xl font-semibold text-center text-slate-700 mb-4">
            My Profile
          </h2>

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <img
              src={
                user?.pic ||
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600"
            />
          </div>

          {/* Info */}
          <div className="text-center space-y-1">
            <p className="text-lg font-medium text-slate-700">
              {user?.name || "Guest User"}
            </p>
            <p className="text-sm text-slate-500">
              {user?.email || "guest@example.com"}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                         hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
