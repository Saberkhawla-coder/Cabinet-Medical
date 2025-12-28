import React, { useEffect,useState } from 'react';
import { Plus, Calendar, Download,Icon } from "lucide-react";
import RdvTable from './RdvTable';
import AddRdvModal from "./AddRdvModal";
import { useSelector , useDispatch} from 'react-redux';
import { fetchappointments } from '../../../../redux/slices/Appointments/appointmentsSlice';
function Rdv() {
  const [openModal, setOpenModal] = useState(false);
  const {appointments}=useSelector((state)=>state.appointments)
  const now=new Date();
  const startOfWeek=new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() )
  startOfWeek.setHours(0,0,0,0)

  const endOfWeek=new Date(now);
  endOfWeek.setDate(startOfWeek.getDate() -6)
  endOfWeek.setHours(23, 59, 59, 999);

  const appointmentsThisWeek = appointments.filter((appt) => {
    const date = new Date(appt.date); 
    return date >= startOfWeek && date <= endOfWeek;
  });

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchappointments())
  },[dispatch])
  return (
    <div className="m-8">
     
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des RDV</h1>
          <p className="text-gray-600 mt-2">Consultez et gérez l'ensemble des rendez-vous de votre cabinet</p>
        </div>
         <button
          onClick={() => setOpenModal(true)}
          className="mt-4 md:mt-0 flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow"
        >
          <Plus className="w-5 h-5 mr-2" /> Nouveau RDV
        </button>
        <AddRdvModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
      />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>

          <div className="ml-4">
            <p className="text-gray-500 text-sm">Total RDV</p>
            <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
          </div>
        </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>

          <div className="ml-4">
            <p className="text-gray-500 text-sm">RDV Confirmés</p>
            <p className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.status === "confirmed").length}</p>
          </div>
        </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>

          <div className="ml-4">
            <p className="text-gray-500 text-sm">RDV en attente</p>
            <p className="text-2xl font-bold text-gray-900">{appointments.filter(c=>c.status==='pending').length}</p>
          </div>
        </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>

          <div className="ml-4">
            <p className="text-gray-500 text-sm">RDV cette semaine</p>
            <p className="text-2xl font-bold text-gray-900">{appointmentsThisWeek.length}</p>
          </div>
        </div>
        </div>
        </div>
        

     
      <RdvTable />
    </div>
  );
}

export default Rdv;
