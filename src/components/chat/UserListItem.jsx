const UserListItem = () => {
  return (
    <div className="flex items-center gap-3 p-2 bg-slate-100 rounded-lg cursor-pointer hover:bg-slate-200 transition">
      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
        U
      </div>

      <div>
        <p className="font-medium text-slate-700">John Doe</p>
        <p className="text-sm text-slate-500">john@example.com</p>
      </div>
    </div>
  );
};

export default UserListItem;
