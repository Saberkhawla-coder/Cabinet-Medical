import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchMyDoctorAppointments } from "../../../../redux/slices/Doctors/myAppointmentsSlice";
import { updateAppointmentStatus } from "../../../../redux/slices/Doctors/updateAppointmentStatus";
import { format } from "date-fns";

export default function RdvTableDoc() {
  const dispatch = useDispatch();
  const { appointments: myAppointments = [], loading } = useSelector(
    (state) => state.myAppointmentsDoc
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentMyAppointments = myAppointments.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(myAppointments.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchMyDoctorAppointments());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    dispatch(updateAppointmentStatus({ id, status }))
      .unwrap()
      .then(() => dispatch(fetchMyDoctorAppointments()))
      .catch((err) => console.log(err));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-72">
        <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <div className="mt-3 bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-700">My Appointments</h2>

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-80 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100/30 text-gray-700 text-sm uppercase tracking-wide">
              <th className="py-3 px-6 text-center font-semibold">Patient</th>
              <th className="py-3 px-6 text-center font-semibold">Date</th>
              <th className="py-3 px-6 text-center font-semibold">Time</th>
              <th className="py-3 px-6 text-center font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y text-center">
            {currentMyAppointments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400 italic">
                  No appointments at the moment
                </td>
              </tr>
            ) : (
              currentMyAppointments.map((appoint) => (
                <tr
                  key={appoint.id}
                  className="hover:bg-blue-50 transition-colors duration-300 cursor-pointer border border-gray-100"
                >
                  <td className="px-6 py-4 text-center font-medium text-gray-800">
                    {appoint?.patient?.user?.name || "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {appoint?.appointment_date
                      ? format(new Date(appoint.appointment_date), "dd/MM/yyyy")
                      : "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {appoint?.appointment_time || "—"}
                  </td>

                  <td className="px-6 py-4 flex gap-2 justify-center">
                    {["confirmed", "pending", "cancelled"].map((st) => (
                      <span
                        key={st}
                        onClick={() => handleStatusChange(appoint.id, st)}
                        className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-full transition 
                          ${
                            appoint.status === st
                              ? st === "confirmed"
                                ? "bg-green-500 text-white"
                                : st === "pending"
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                              : st === "confirmed"
                              ? "bg-green-100 hover:bg-green-500 hover:text-white"
                              : st === "pending"
                              ? "bg-yellow-100 hover:bg-yellow-500 hover:text-white"
                              : "bg-red-100 hover:bg-red-500 hover:text-white"
                          }`}
                      >
                        {st === "confirmed" ? "Confirm" : st === "pending" ? "Pending" : "Cancel"}
                      </span>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-end items-end mt-8">
          <div className="flex items-center gap-2 px-4 py-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition duration-200 ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed opacity-50"
                  : "text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span className="text-lg">
                <ChevronLeft />
              </span>
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                      currentPage === page
                        ? "bg-blue-500 text-white font-semibold shadow-md"
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              if (page === currentPage - 2 || page === currentPage + 2)
                return (
                  <span key={i} className="px-1 text-gray-600">
                    •••
                  </span>
                );
              return null;
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition duration-200 ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed opacity-50"
                  : "text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span className="text-lg">
                <ChevronRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
