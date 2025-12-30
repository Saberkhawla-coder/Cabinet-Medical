import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarCheck, MessageSquarePlus, UsersRound } from 'lucide-react';
import { fetchAllDoctors } from '../../../../redux/slices/Doctors/allDoctors';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserDoctor } from "react-icons/fa6";

import GraphiquePatients from './GraphiquePatients';
import { fetchAllContact } from '../../../../redux/slices/Contact/allContact';
import { fetchAllPatients } from '../../../../redux/slices/Patients/patientsSlice';
import { fetchappointments } from '../../../../redux/slices/Appointments/appointmentsSlice';

function DashboardInfos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { patients } = useSelector((state) => state.patients);
  const { contacts } = useSelector((state) => state.contacts);
  const { doctors, loading } = useSelector((state) => state.doctors);
  const { appointments } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchappointments());
    dispatch(fetchAllPatients());
    dispatch(fetchAllContact());
  }, [dispatch]);

  const prevDoctor = () => {
    setCurrentIndex((prev) => (prev === 0 ? doctors.length - 1 : prev - 1));
  };

  const nextDoctor = () => {
    setCurrentIndex((prev) => (prev === doctors.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (doctors.length === 0) return <p className="text-gray-500">Loading...</p>;

  const doctor = doctors[currentIndex];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

        {/* Doctor Card */}
        <div className="relative rounded-2xl shadow-lg flex flex-col items-center justify-center text-center h-[300px] row-span-2">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-lg font-bold text-gray-600">
                  {new Date().toLocaleDateString('en-GB', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short' 
                  }).replace(/\./g, '').toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <img
            src={`http://127.0.0.1:8000/storage/${doctor.img}`}
            alt={doctor.user?.name}
            className="w-32 h-32 object-cover rounded-full shadow-md mb-4"
          />

          <h2 className="text-xl font-bold text-gray-800 mb-1">{doctor.user?.name}</h2>
          <p className="text-gray-600">{doctor.speciality}</p>

          <button
            onClick={prevDoctor}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full p-2 shadow"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextDoctor}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full p-2 shadow"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Doctors Count */}
        <div className="rounded-2xl shadow-lg p-6 h-[140px] flex flex-col justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <FaUserDoctor />
          </div>
          <p className="text-sm text-gray-500">Doctors</p>
          <h3 className="text-3xl font-bold text-gray-800">{doctors.length}</h3>
        </div>

        {/* Patients Count */}
        <div className="rounded-2xl shadow-lg p-6 h-[140px] flex flex-col justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <UsersRound />
          </div>
          <p className="text-sm text-gray-500">Patients</p>
          <h3 className="text-3xl font-bold text-gray-800">{patients.length}</h3>
        </div>

        {/* Appointments Count */}
        <div className="rounded-2xl shadow-lg p-6 h-[140px] flex items-center">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-4xl font-bold text-gray-800">{appointments.length}</h3>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CalendarCheck size={26} />
            </div>
          </div>
        </div>

        {/* Contacts Count */}
        <div className="rounded-2xl shadow-lg p-6 h-[140px] flex items-center">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-4xl font-bold text-gray-800">{contacts.length}</h3>
              <p className="text-sm text-gray-500">Contacts</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MessageSquarePlus size={26} />
            </div>
          </div>
        </div>

      </div>

      <GraphiquePatients />
    </div>
  );
}

export default DashboardInfos;
