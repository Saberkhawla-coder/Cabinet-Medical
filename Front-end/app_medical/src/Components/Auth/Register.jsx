import React, { useEffect, useState } from "react";
import { User, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegister } from "../../redux/slices/Auth/registerSlice";
import { toast } from 'sonner';
import { Toaster } from 'sonner';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.register);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [flipped, setFlipped] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

useEffect(() => {
  if (error) {
    toast.error(error);
  }

  if (success) {
    toast.success("Inscription réussie ! Vous pouvez vous connecter.");
    const navigateTimer = setTimeout(() => {
      dispatch(resetRegister());
      navigate("/login");
    }, 1000);

    return () => clearTimeout(navigateTimer);
  }
}, [success, error, dispatch, navigate]);
useEffect(() => {
  const flipTimer = setTimeout(() => setFlipped(true), 0);
  return () => clearTimeout(flipTimer);
}, []);



  return (
    <div className="flex justify-center items-center min-h-screen flex-col bg-gray-100 perspective">
       <Link to="/" className="font-bold text-3xl p-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                    Health<span className="">Care</span>
        </Link>
      <div
        className={`relative w-[900px] h-[450px] rounded-2xl shadow-2xl grid grid-cols-2 transition-transform duration-1000 ease-in-out transform ${
          flipped ? "rotate-y-0" : "rotate-y-180"
        }`}
      >
        {/* Front */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-12 flex flex-col justify-center gap-4 z-10"
        >
          <h1 className="text-3xl font-bold text-sky-500 text-center">
            Register
          </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="relative">
            <User className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-sky-500 py-2 pr-10 outline-none"
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

          <div className="relative">
            <Lock className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={form.password_confirmation}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-sky-500 py-2 pr-10 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-full font-medium hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-400 hover:underline">
              Sign In
            </Link>
          </p>
        </form>

        {/* Back / animation side */}
        <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white z-10">WELCOME!</h1>
        </div>
      </div>
    </div>
  );
}

export default Register;
