import React, { useState } from "react";
import { User, Lock ,Mail} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
function Login() {
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  const goRegister = (e) => {
    e.preventDefault();
    setHide(true);
    setTimeout(() => navigate("/register"), 400);
  };
  const [form,setForm]=useState({
    email:'',
    password:''
  });
  const handleChange=(e)=>{
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  }

  const handleLogin=async()=>{
    try{
        const res=await api.post("/login",{
            email:form.email,
            password:form.password,
        });
        localStorage.setItem('token', res.data.token)
        navigate("/");
    }catch(err){
        alert("Email or password incorrect" + err);
    }
  }

  return (
    <div className="bg-[#0f172a] flex justify-center items-center min-h-screen">
      <div className="relative w-[900px] h-[450px] rounded-2xl overflow-hidden shadow-[0_0_40px_#0ea5e9] bg-[#0f172a] grid grid-cols-2">

        {/* Welcome Banner */}
       <div
        className={`relative bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center
            transition-all duration-400 ease-in-out
            ${hide ? "-translate-x-full opacity-0" : ""}
        `}
        >
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="text-4xl font-bold text-white z-10">
            WELCOME BACK!
        </h1>
        </div>

        {/* Form */}
        <div
          className={`p-12 flex flex-col justify-center gap-6 z-10
            transition-all duration-400 ease-in-out
            ${hide ? "translate-x-full opacity-0" : ""}
          `}
        >
          <h1 className="text-3xl font-bold text-white text-center">Login</h1>

          <div className="relative">
            <Mail className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              className="w-full bg-transparent border-b border-sky-500 text-white py-2 pr-10 outline-none focus:border-sky-400"
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
            />
          </div>

          <button onClick={handleLogin} className="mt-4 bg-gradient-to-r from-sky-400 to-cyan-500 text-white py-2 rounded-full font-medium hover:opacity-90 transition">
            Login
          </button>

          <p className="text-gray-400 text-sm text-center">
            Don't have an account?{" "}
            <Link
              onClick={goRegister}
              className="text-sky-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Diagonal */}
        <div className="absolute right-2/4 top-0 h-full w-25 bg-[#0f172a] transform -skew-x-[-10deg] origin-top"></div>
      </div>
    </div>
  );
}

export default Login;
