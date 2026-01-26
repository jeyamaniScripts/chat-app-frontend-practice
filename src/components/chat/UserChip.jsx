import { FaTimes } from "react-icons/fa";

const UserChip = ({ user, onRemove }) => {
  return (
    <div className="flex items-center gap-1 bg-indigo-100 text-indigo-700
                    px-2 py-1 rounded-full text-sm">
      <span>{user.name}</span>
      <FaTimes
        className="cursor-pointer text-xs"
        onClick={onRemove}
      />
    </div>
  );
};

export default UserChip;
