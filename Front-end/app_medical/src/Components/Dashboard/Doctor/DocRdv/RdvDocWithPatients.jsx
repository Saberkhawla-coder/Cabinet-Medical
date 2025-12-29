import React, { useEffect } from 'react';
import { Calendar } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { isThisMonth, parseISO, isToday } from 'date-fns';
import { fetchMyDoctorAppointments } from '../../../../redux/slices/Doctors/myAppointmentsSlice';
import RdvTableDoc from './RdvTableDoc';

function RdvDocWithPatients() {
  const dispatch = useDispatch();
  const { appointments: myAppointments } = useSelector(state => state.myAppointmentsDoc);


  const appointmentsThisMonth = myAppointments?.filter(app =>
    app?.appointment_date && isThisMonth(parseISO(app.appointment_date))
  ) || [];
  const appointmentsToday = myAppointments?.filter(app =>
    app?.appointment_date && isToday(parseISO(app.appointment_date))
  ) || [];

  useEffect(() => {
    dispatch(fetchMyDoctorAppointments());
  }, [dispatch]);

  return (
    <div className="m-8">

      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Doctor Appointments Overview</h2>
        <p className="text-gray-600 mt-1">
          Summary of your appointments including today's visits, monthly stats and status-based distribution.
        </p>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        
        <Card 
          color="sky" 
          icon={<Calendar className="w-6 h-6 text-sky-600" />} 
          label="Today" 
          value={appointmentsToday?.length || 0} 
        />

        
        <Card 
          color="green" 
          icon={<Calendar className="w-6 h-6 text-green-600" />} 
          label="Confirmed " 
          value={myAppointments.filter(app => app.status === 'confirmed').length} 
        />

     
        <Card 
          color="orange"
          icon={<Calendar className="w-6 h-6 text-orange-600" />} 
          label="Pending " 
          value={myAppointments.filter(app => app.status === 'pending').length} 
        />

        <Card 
          color="gray" 
          icon={<Calendar className="w-6 h-6 text-gray-600" />} 
          label="This Month" 
          value={appointmentsThisMonth.length} 
        />

      </div>
      <RdvTableDoc/>
    </div>
  );
}



function Card({ icon, label, value, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center">
        <div className={`p-3 bg-${color}-100 rounded-xl`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default RdvDocWithPatients;
