import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Calendar } from "lucide-react";
import { isToday, parseISO, isThisYear, isThisMonth } from 'date-fns';
import { fetchMyDoctorPatients } from '../../../../redux/slices/Doctors/myPatientsSlice';
import { fetchMyDoctorAppointments } from '../../../../redux/slices/Doctors/myAppointmentsSlice';
import { fetchMyDoctor } from '../../../../redux/slices/Doctors/myDoctorSlice';
import PatientTableDoc from './PatientTabeDoc';

function PatientCardDoc() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const { patients: myPatients } = useSelector(state => state.myPatients);
  const { appointments: myAppointments } = useSelector(state => state.myAppointmentsDoc);

  // Fetch data on load
  useEffect(() => {
    if (user?.role === "doctor") {
      dispatch(fetchMyDoctor());
      dispatch(fetchMyDoctorPatients());
      dispatch(fetchMyDoctorAppointments());
    }
  }, [dispatch, user?.role]);

  // Today's appointments
  const todayAppointments = myAppointments?.filter(
    appt => appt?.appointment_date && isToday(parseISO(appt.appointment_date))
  );

  // Unique patients with appointments today
  const todayPatients = todayAppointments?.map(appt => appt.patient);
  const uniqueTodayPatients = todayPatients?.filter(
    (patient, index, self) => patient && self.findIndex(p => p.id === patient.id) === index
  );

  // Patients created this month
  const monthPatients = myPatients?.filter(
    patient => patient?.created_at && isThisMonth(parseISO(patient.created_at))
  );

  // Patients created this year
  const yearPatients = myPatients?.filter(
    patient => patient?.created_at && isThisYear(parseISO(patient.created_at))
  );

  return (
    <div className="m-8">
        <div className="mb-6">
      <h2 className="text-3xl font-bold text-gray-900">Patient Dashboard</h2>
      <p className="text-gray-500 mt-2">
        Here is a summary of patients with appointments, created this month, and this year.
      </p>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card icon={<Users className="w-6 h-6 text-blue-600" />} color="blue" label="Patients This Month" value={monthPatients?.length || 0} />
        <Card icon={<Calendar className="w-6 h-6 text-orange-600" />} color="orange" label="Appointments Today" value={uniqueTodayPatients?.length || 0} />
        <Card icon={<Users className="w-6 h-6 text-green-600" />} color="green" label="Patients This Year" value={yearPatients?.length || 0} />
      </div>
      <PatientTableDoc/>
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

export default PatientCardDoc;
