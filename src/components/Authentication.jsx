import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../sevices/authService";
import { useUser } from "../context/UserContext";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser(); // 🔥 context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
  });

  const { name, email, password, pic } = formData;

  const handleChange = (e) => {
    if (e.target.name === "pic") {
      setFormData({ ...formData, pic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = isLogin
        ? await loginUser(email, password)
        : await registerUser({ name, email, password, pic });

      setUser(data); // 🔥 global auth state + localStorage handled in context

      toast.success(isLogin ? "Login successful" : "Registration successful");
      navigate("/chat");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-700">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          {!isLogin && (
            <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 hover:border-slate-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/30 transition">
              <FaUser className="text-slate-400" />
              <input
                name="name"
                placeholder="Name"
                className="w-full p-2 outline-none text-slate-700"
                value={name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 hover:border-slate-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/30 transition">
            <FaEnvelope className="text-slate-400" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 outline-none text-slate-700"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 hover:border-slate-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/30 transition">
            <FaLock className="text-slate-400" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 outline-none text-slate-700"
              value={password}
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 hover:border-slate-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/30 transition">
              <FaImage className="text-slate-400" />
              <input
                name="pic"
                type="file"
                className="w-full p-2 outline-none text-slate-700"
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-slate-600">
          {isLogin ? "New user?" : "Already have an account?"}
          <button
            className="text-indigo-600 ml-1 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
