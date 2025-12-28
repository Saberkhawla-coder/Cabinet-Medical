import React, { useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointments, cancelAppointment } from "../../../redux/slices/Appointments/myAppointmentsSlice";

function MyAppointments() {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.myAppointments);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      dispatch(cancelAppointment(id));
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
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
              {/* Doctor Info */}
              <div className="flex items-center mb-4 md:mb-0">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {appt.doctor?.user?.name || "Unknown Doctor"}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{appt.appointment_date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{appt.appointment_time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status + Cancel Button */}
              <div className="flex items-center space-x-4">
                <span
                  className={`px-5 py-2 rounded-full font-medium text-sm ${getStatusColor(appt.status)}`}
                >
                  {appt.status ? appt.status[0].toUpperCase() + appt.status.slice(1) : "N/A"}
                </span>
                {appt.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyAppointments;
