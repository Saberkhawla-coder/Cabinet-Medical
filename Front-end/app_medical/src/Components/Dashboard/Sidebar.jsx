import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, Users, Stethoscope,MessageCircle,CalendarHeart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/Auth/authSlice";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth)
  const isAdmin = user?.role === "admin";
  
  
 const handleLogout = async () => {
  await dispatch(logoutUser());
  navigate("/login");
};



  return (
    <aside className="w-64 min-h-screen bg-[#DBF5F3] border-r border-slate-200 flex flex-col">
      {isAdmin ? <>
      <Link
          to="/"
          className="font-bold text-lg text-transparent bg-clip-text p-4 bg-gradient-to-r from-blue-600 via-teal-300 to-teal-300"
        >
    HealthCare
      </Link>


  <nav className="flex-1 px-3 py-6 space-y-1">
    <Link
      to="/dashboard/admin"
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition ${
        location.pathname === "/dashboard/admin"
          ? "bg-blue-50 text-blue-600 rounded-b-full"
          : "text-slate-700 hover:bg-blue-50"
      }`}
    >
      <LayoutDashboard size={18} />
      Tableau de bord
    </Link>

    <Link
      to="/patients"
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition ${
        location.pathname === "/patients"
          ? "bg-blue-50 text-blue-600 rounded-b-full"
          : "text-slate-700 hover:bg-blue-50"
      }`}
    >
      <Users size={18} />
      Patients
    </Link>

    <Link
      to="/doctors"
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition ${
        location.pathname === "/doctors"
          ? "bg-blue-50 text-blue-600 rounded-b-full"
          : "text-slate-700 hover:bg-blue-50"
      }`}
    >
      <Stethoscope size={18} />
      Médecins
    </Link>
     <Link
      to="/admin/contact-history"
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition ${
        location.pathname === "/admin/contact-history"
          ? "bg-blue-50 text-blue-600 rounded-b-full"
          : "text-slate-700 hover:bg-blue-50"
      }`}
    >

    <MessageCircle size={18} />
      Historique des Contacts
    </Link>
     <Link
      to="/admin/RDV"
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition ${
        location.pathname === "/admin/RDV"
          ? "bg-blue-50 text-blue-600 rounded-b-full"
          : "text-slate-700 hover:bg-blue-50"
      }`}
    >
      <CalendarHeart size={18} />
      Rendez-vous
    </Link>

  </nav>


  <button
    onClick={handleLogout}
    className="flex items-center gap-3 px-6 py-4 text-sm text-slate-500  cursor-pointer border-t border-slate-200 transition"
  >
    <LogOut size={18} />
    Déconnexion
  </button>
      </>:<>
       <Link
          to="/"
          className="font-bold text-lg text-transparent bg-clip-text p-4 bg-gradient-to-r from-blue-600 via-teal-300 to-teal-300"
        >
    HealthCare
      </Link>


  <nav className="flex-1 px-3 py-6 space-y-1">
    <Link
      to="/dashboard/doctor"
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition ${
        location.pathname === "/dashboard/doctor"
          ? "bg-blue-50 text-blue-600 rounded-b-full"
          : "text-slate-700 hover:bg-blue-50"
      }`}
    >
      <LayoutDashboard size={18} />
      Tableau de bord
    </Link>

    <Link
      to="/patients/doctor"
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition ${
        location.pathname === "/patients"
          ? "bg-blue-50 text-blue-600 rounded-b-full"
          : "text-slate-700 hover:bg-blue-50"
      }`}
    >
      <Users size={18} />
      Patients
    </Link>

   
     <Link
      to="/admin/RDV"
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition ${
        location.pathname === "/admin/RDV"
          ? "bg-blue-50 text-blue-600 rounded-b-full"
          : "text-slate-700 hover:bg-blue-50"
      }`}
    >
      <CalendarHeart size={18} />
      Rendez-vous
    </Link>

  </nav>
       <button
    onClick={handleLogout}
    className="flex items-center gap-3 px-6 py-4 text-sm text-slate-500  cursor-pointer border-t border-slate-200 transition"
  >
    <LogOut size={18} />
    Déconnexion
  </button> </>}
  
</aside>

  );
}

export default Sidebar;
