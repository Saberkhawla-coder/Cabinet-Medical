import React, { useEffect, useState } from 'react'
import { User, LogOut, MessageCircle } from "lucide-react";
import { Link , useNavigate} from 'react-router-dom'
import { logoutUser } from "../../redux/slices/Auth/authSlice";
import { useSelector, useDispatch} from 'react-redux';
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

    const {isAuthenticated ,user} = useSelector((state) => state.auth);
    const isPatient = user?.role === "patient";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
 const navigate = useNavigate();
 
  const dispatch=useDispatch();
  
 const handleLogout = async () => {
  await dispatch(logoutUser());
  navigate("/login");
};
  


  return isPatient ? (
  <nav className={`fixed z-50 transition-all duration-500 ease-out
    ${scrolled
      ? 'bottom-6 left-1/2 -translate-x-1/2 text-sky-500  bg-white shadow-lg px-8 py-4 rounded-full flex items-center gap-12'
      : 'top-0 left-0 w-full bg-transparent text-sky-500 px-6 py-3 flex justify-between items-center shadow-md'
    }
  `}>
    <Link to="/" className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
      Health<span>Care</span>
    </Link>

    <div className="flex gap-8 ">
      <Link to="/">Home</Link>
      
      <Link to="/healthTips">HealthTips</Link>
      <Link to="/myAppointment">Appointments </Link>
      <Link to="/bookAppointment">Book </Link>
    </div>

    {!isAuthenticated ? (
      <Link to="/login" aria-label="Login" title="Login">
        <User className="hover:text-green-800/50 cursor-pointer" />
      </Link>
    ) : (
      <div className='flex justify-center items-center gap-2 '>
         <Link to="/chat"><MessageCircle size={20}/></Link>
      <button onClick={handleLogout}>
        <LogOut size={20} />
      </button>
      </div>
     
    )}
  </nav>
) : (
  <nav className={`fixed z-50 transition-all duration-500 ease-out
    ${scrolled
      ? 'bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-lg px-8 py-4 rounded-full flex items-center gap-12'
      : 'top-0 left-0 w-full bg-transparent text-sky-500 px-6 py-3 flex justify-between items-center shadow-md'
    }
  `}>
    <Link to="/" className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
      Health<span>Care</span>
    </Link>

    <div className="flex gap-8 ">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>

    {!isAuthenticated ? (
      <Link to="/login" aria-label="Login" title="Login">
        <User className="hover:text-sky-500" />
      </Link>
    ) : (
      <button onClick={handleLogout}>
        <LogOut size={20} />
      </button>
    )}
  </nav>
);

}

export default Navbar
