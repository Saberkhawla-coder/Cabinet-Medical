import "./App.css";
import { Routes, Route } from "react-router-dom";


import Home from "./Components/pages/Home/Home";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

import ChatPage from "./Components/ConnectedPatient/Chat/ChatPage";

import PublicLayout from "./Components/layouts/PublicLayout";
import AdminLayout from "./Components/layouts/AdminLayout";
import AdminDashboard from "./Components/Dashboard/Admin/AdminDash/AdminDashboard";
import PatientsDashboard from "./Components/Dashboard/Admin/Patients/PatientsDashboard";
import MedcineDashboard from "./Components/Dashboard/Admin/Medcine/MedcineDashboard";
import ContactDashoard from "./Components/Dashboard/Admin/ContactHis/ContactDashoard";
import ProtectedRoute from "./Components/layouts/ProtectedRoute";
import DoctorDashboard from "./Components/Dashboard/Doctor/DoctorDash/DoctorDashboard";
import Rdv from "./Components/Dashboard/Admin/RDV/RdvCard";
import RdvDashboard from "./Components/Dashboard/Admin/RDV/RdvDashboard";
import { Toaster } from 'sonner';
import BookAppointmentPage from "./Components/ConnectedPatient/BookAppointment/BookAppointmentPage";
import AppointmentsPage from "./Components/ConnectedPatient/Appointments/AppointmentsPage";
import HealthTipsPage from "./Components/ConnectedPatient/Health/HealthTipsPage";
import PatientsDashboardDoc from "./Components/Dashboard/Doctor/DocPatients/PatientsDashboardDoc";
function App() {
   

  return (
    <>
    <Toaster richColors  toastOptions={{
    duration: 4000,          
    style: {
      borderRadius: '12px',  
      width:'100%',
      fontSize: '14px',
     
    },
  }} position="top-right" /> 
    <Routes>
      
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/bookAppointment" element={<BookAppointmentPage />} />
        <Route path="/myAppointment" element={<AppointmentsPage />} />
        <Route path="/healthTips" element={<HealthTipsPage />} />
       
      </Route> 
      <Route path="/chat" element={<ChatPage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard/admin" element={<AdminDashboard/>} />
        <Route path="/patients"  element={<PatientsDashboard/>}/>
        <Route path="/doctors"  element={<MedcineDashboard/>}/>
        <Route path="/admin/contact-history"  element={<ContactDashoard/>}/>
        <Route path="/admin/RDV"  element={<RdvDashboard/>}/>
        <Route path="/dashboard/doctor" element={<DoctorDashboard/>} />
        <Route path="/patients/doctor"  element={<PatientsDashboardDoc/>}/>
      </Route>
    </Routes>
    </>
    
  );
}

export default App;
