// AppointmentsPage.jsx
import React from "react";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import MyAppointments from "./MyAppointments";

function AppointmentsPage() {
  return (
    <div className="min-h-screen ">
   
      <section className="relative w-full h-[70vh] flex justify-center items-center">
        <div className="absolute inset-0 bg-[url('/images/Healthy/bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-sky-200/30 backdrop-blur-sm"></div>

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Your Appointments
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Manage your health appointments easily. Check your upcoming visits and book new appointments instantly.
          </p>

          <Link
            to="/bookAppointment"
            className="inline-flex items-center gap-2 mt-6 bg-green-600 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-green-700 transition-all hover:scale-105"
          >
            <Phone size={18} />
            Book Appointment
          </Link>
        </div>
      </section>

   
      <section className="py-12">
        <MyAppointments />
      </section>
    </div>
  );
}

export default AppointmentsPage;
