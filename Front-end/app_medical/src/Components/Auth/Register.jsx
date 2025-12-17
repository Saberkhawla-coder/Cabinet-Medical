import React, { useState } from "react";
import { User, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios"; 

function Register() {
  const [hide, setHide] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/register", form); // Laravel endpoint
      setLoading(false);
      // animation then navigate
      setHide(true);
      setTimeout(() => navigate("/login"), 400);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Network Error");
      }
    }
  };

  const goLogin = (e) => {
    e.preventDefault();
    setHide(true);
    setTimeout(() => navigate("/login"), 400);
  };

  return (
    <div className="bg-[#0f172a] flex justify-center items-center min-h-screen">
      <div className="relative w-[900px] h-[450px] rounded-2xl overflow-hidden shadow-[0_0_40px_#0ea5e9] bg-[#0f172a] grid grid-cols-2">

       
        <div
          className={`relative bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center
            transition-all duration-400 ease-in-out
            ${hide ? "-translate-x-full opacity-0" : ""}`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <h1 className="text-4xl font-bold text-white z-10">WELCOME!</h1>
        </div>

        
        <form
          onSubmit={handleSubmit}
          className={`p-12 flex flex-col justify-center gap-4 z-10
            transition-all duration-400 ease-in-out
            ${hide ? "translate-x-full opacity-0" : ""}`}
        >
          <h1 className="text-3xl font-bold text-white text-center">Register</h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="relative">
            <User className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-sky-500 text-white py-2 pr-10 outline-none focus:border-sky-400"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-sky-500 text-white py-2 pr-10 outline-none focus:border-sky-400"
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
              className="w-full bg-transparent border-b border-sky-500 text-white py-2 pr-10 outline-none focus:border-sky-400"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={form.password_confirmation}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-sky-500 text-white py-2 pr-10 outline-none focus:border-sky-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-sky-400 to-cyan-500 text-white py-2 rounded-full font-medium hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <Link onClick={goLogin} className="text-sky-400 hover:underline">
              Sign In
            </Link>
          </p>
        </form>

        
        <div className="absolute left-1/2 top-0 h-full w-42 bg-[#0f172a] transform skew-x-[-20deg] origin-top"></div>
      </div>
    </div>
  );
}

export default Register;
