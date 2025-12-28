import React, { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/Auth/authSlice";
import { toast } from 'sonner';
import { Toaster } from 'sonner';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flipped, setFlipped] = useState(false);

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

 useEffect(() => {
  if (error) {
    toast.error(error); 
  }

  if (isAuthenticated) {
    toast.success(`Bienvenue, ${user?.name}!`);
    let navigateTimer;
    if (user?.role === "admin") {
      navigateTimer = setTimeout(() => navigate("/dashboard/admin", { replace: true }), 1000);
    } else if (user?.role === 'doctor') {
      navigateTimer = setTimeout(() => navigate("/dashboard/doctor"), 1000);
    } else {
      navigateTimer = setTimeout(() => navigate("/"), 1000);
    }
    return () => clearTimeout(navigateTimer);
  }
}, [error, isAuthenticated, user, navigate]);

useEffect(() => {
  const flipTimer = setTimeout(() => setFlipped(true), 0);
  return () => clearTimeout(flipTimer);
}, []);

  return (
    
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-100">
       <Link to="/" className="font-bold text-3xl p-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Health<span className="">Care</span>
        </Link>
      
      <div
        className={`relative w-[900px] h-[450px] rounded-2xl shadow-2xl grid grid-cols-2 transition-transform duration-1000 ease-in-out transform ${
          flipped ? "rotate-y-0" : "rotate-y-[180deg]"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 flex flex-col justify-center items-center p-12">
          <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
            WELCOME BACK!
          </h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-gradient-to-r from-white via-gray-50 to-white p-12 flex flex-col justify-center gap-6"
        >
          <h1 className="text-3xl font-bold text-sky-500 text-center">Login</h1>

          <div className="relative">
            <Mail className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-sky-500 py-2 pr-10 outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-sky-500 py-2 pr-10 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-full font-medium hover:opacity-90 transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-sky-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
