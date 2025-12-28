import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDoctorConnected } from '../../../../redux/slices/Doctors/DoctorSpe';
import { FaUserDoctor } from "react-icons/fa6";
function DoctorDashboard() {
    const dispatch = useDispatch();
    const { doctor, loading } = useSelector((state) => state.doctor);

  useEffect(() => {
  dispatch(fetchDoctorConnected());
}, [dispatch]);

  if (loading) return <p>Chargement...</p>;
  if (!doctor) return <p>Aucun docteur trouvé</p>;
  
  return (
    <div><div className="relative  rounded-2xl shadow-lg flex flex-col items-center justify-center text-center h-[300px] row-span-2">
             <div className=" p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aujourd'hui</p>
              <p className="text-lg font-bold text-gray-600">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'short', 
                  day: 'numeric', 
                  month: 'short' 
                }).replace(/\./g, '').toUpperCase()}
              </p>
            </div>
           
          </div>
        </div>
      {doctor?.img ? (
  <img
    src={`http://127.0.0.1:8000/storage/${doctor.img}`}
    alt={doctor?.user?.name}
    className="object-cover rounded-full shadow-md mb-4"
  />
) : (
  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shadow-md mb-4">
    <FaUserDoctor className='w-16 h-16'/>
  </div>
)}
            <h2 className="text-xl font-bold text-gray-800 mb-1">
            {doctor?.user?.name}
            </h2>
            {console.log( doctor?.user?.name)}
            <p className="text-gray-600">{doctor?.speciality}</p>
        </div></div>
  )
}

export default DoctorDashboard