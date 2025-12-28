// MyAppointments.jsx
import React from "react";
import { Calendar, Clock } from "lucide-react";

function MyAppointments() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Smith",
      avatar: "/images/doctors/smith.jpg",
      date: "27/12/2025",
      time: "15:00",
      description: "General Consultation",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Johnson",
      avatar: "/images/doctors/johnson.jpg",
      date: "30/12/2025",
      time: "10:00",
      description: "Diabetes Follow-up",
      status: "Pending",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have no appointments scheduled.
        </p>
      ) : (
        <ul className="space-y-6">
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 md:p-6"
            >
              {/* Avatar + Info */}
              <div className="flex items-center mb-4 md:mb-0">
                {appt.avatar && (
                  <img
                    src={appt.avatar}
                    alt={appt.doctor}
                    className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{appt.doctor}</h3>
                  <div className="flex items-center space-x-4 text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{appt.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{appt.time}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{appt.description}</p>
                </div>
              </div>

              {/* Status */}
              <span
                className={`px-5 py-2 rounded-full font-medium text-sm ${getStatusColor(
                  appt.status
                )}`}
              >
                {appt.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyAppointments;
