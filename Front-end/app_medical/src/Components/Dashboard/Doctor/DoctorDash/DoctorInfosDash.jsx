import React, { useEffect } from "react";
import { CalendarCheck, UsersRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyDoctor } from "../../../../redux/slices/Doctors/myDoctorSlice";
import { fetchMyDoctorPatients } from "../../../../redux/slices/Doctors/myPatientsSlice";
import { fetchMyDoctorAppointments } from "../../../../redux/slices/Doctors/myAppointmentsSlice";
import { FaUserDoctor } from "react-icons/fa6";
import { isToday, parseISO, isThisYear } from 'date-fns'; 
import GraphiquePatientsDoc from "./GraphiquePatientsDoc";


export default function DoctorInfosDash() {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { doctor: myDoctor, loading } = useSelector(state => state.myDoctor);

  const { patients: myPatients } = useSelector(state => state.myPatients);
  const { appointments: myAppointments } = useSelector(state => state.myAppointmentsDoc);

  useEffect(() => {
    if (user?.role === "doctor") {
      dispatch(fetchMyDoctor());
      dispatch(fetchMyDoctorPatients());
      dispatch(fetchMyDoctorAppointments());
    }
  }, [dispatch, user?.role]);

  if (loading || !myDoctor)
    return <div className="text-center py-10 text-gray-500">Loading ...</div>;

  const doctor = myDoctor;
  const todayAppointments = myAppointments?.filter(
    appt => appt?.date && isToday(parseISO(appt.date))
  );

  const todayPatients = todayAppointments?.map(appt => appt.patient);

  const uniqueTodayPatients = todayPatients?.filter(
    (patient, index, self) => patient && self.findIndex(p => p.id === patient.id) === index
  );
  const yearPatients = myPatients?.filter(
    patient => patient?.created_at && isThisYear(parseISO(patient.created_at))
  );

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

        {/* Card Doctor */}
        <div className="rounded-2xl shadow-lg flex flex-col items-center justify-center text-center h-[300px] row-span-2">

          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-3">
            <p className="text-sm text-gray-600">Today</p>
            <p className="text-lg font-bold text-gray-600">
              {new Date().toLocaleDateString("en-US",{weekday:"short",day:"numeric",month:"short"}).toUpperCase()}
            </p>
          </div>

          {doctor?.img ? (
            <img
              src={`http://127.0.0.1:8000/storage/${doctor?.img}`}
              alt={doctor?.user?.name}
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
          ) : (
            <FaUserDoctor className="w-32 h-32 text-gray-300" />
          )}

          <h2 className="text-xl font-bold mt-2">{doctor?.user?.name}</h2>
          <p className="text-gray-600">{doctor?.speciality==='Non définie'?"":doctor?.speciality}</p>

        </div>

        <InfoCard
          icon={<CalendarCheck />}
          label="Appointments Today"
          value={todayAppointments?.length || 0}
        />

        <InfoCard
          icon={<UsersRound />}
          label="Patients Today"
          value={uniqueTodayPatients?.length || 0}
        />

        <InfoCard
          icon={<UsersRound />}
          label="Patients This Year"
          value={yearPatients?.length || 0}
        />
        
        <InfoCard 
          valueClassName={doctor?.is_active ? "text-green-600" : "text-red-600"} 
          icon={<FaUserDoctor />} 
          label={doctor?.user?.name} 
          value={doctor?.is_active ? "Active" : "Inactive"} 
        />

      </div>
      <GraphiquePatientsDoc/>
    </div>
  );
}

function InfoCard({ icon, label, value, valueClassName }) {
  return (
    <div className="rounded-2xl shadow-lg p-6 h-[140px] flex flex-col justify-center">
      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className={`text-3xl font-bold text-gray-800 ${valueClassName || ""}`}>{value}</h3>
    </div>
  );
}
