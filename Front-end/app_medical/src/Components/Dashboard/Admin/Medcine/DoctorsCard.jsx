import React, { useState } from 'react';
import { Plus, User, Calendar, Download } from 'lucide-react';
import DoctorsTable from './DoctorsTable';
import { useSelector } from 'react-redux';
import AddDocModel from './AddDocModel';

function DoctorsCard() {
  const { doctors } = useSelector((state) => state.doctors);
  const { appointments } = useSelector((state) => state.appointments);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(now);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const appointmentsThisWeek = appointments.filter((appt) => {
    const date = new Date(appt.date);
    return date >= startOfWeek && date <= endOfWeek;
  }).length;

  const doctorsThisMonth = doctors.filter((doc) => {
    const date = new Date(doc.created_at);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="m-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
          <p className="text-gray-600 mt-2">View and manage all doctors in your clinic</p>
        </div>
        <button  onClick={() => setIsAddModalOpen(true)} className="mt-4 md:mt-0 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <Plus className="w-5 h-5 mr-2" />
          New Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Active Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{doctors.filter(doc => Boolean(doc.is_active)).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">AppointmentsThisWeek</p>
              <p className="text-2xl font-bold text-gray-900">{appointmentsThisWeek}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">{doctorsThisMonth}</p>
            </div>
          </div>
        </div>
      </div>
       <AddDocModel
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <DoctorsTable />
    </div>
  );
}

export default DoctorsCard;
