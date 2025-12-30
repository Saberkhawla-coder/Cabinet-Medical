import React from "react";
import { Users, User, Download, Calendar, Plus } from "lucide-react";
import PatientTable from "./PatientTable";
import { useSelector } from "react-redux";

function PatientCard() {
  const { patients } = useSelector((state) => state.patients);
  const { appointments } = useSelector((state) => state.appointments);

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
  });

  const totalMen = appointments.filter(app => app.genre === 'Homme').length;
  const totalWomen = appointments.filter(app => app.genre === 'Femmme').length;
  const totalChild = appointments.filter(app => app.genre === 'Enfant').length;
  const mostGender = totalMen > totalWomen ? "Men" : totalWomen > totalChild ? "Women" : "Children";
  const mostGenderCount = Math.max(totalMen, totalWomen, totalChild);

  return (
    <div className="m-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-2">View and manage all patients in your practice</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <Plus className="w-5 h-5 mr-2" />
          New Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Active Patients</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Appointments This Week</p>
              <p className="text-2xl font-bold text-gray-900">{appointmentsThisWeek.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Dominant Gender</p>
              <p className="text-2xl font-bold text-gray-900">
                <span className="font-light text-lg">{mostGender}</span> {mostGenderCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <PatientTable />
    </div>
  );
}

export default PatientCard;
