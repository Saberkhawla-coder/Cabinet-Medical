import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchappointments } from "../../../../redux/slices/Appointments/appointmentsSlice";
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { deleteAappoitment } from "../../../../redux/slices/Appointments/CrudAppSlice";
import UpdateRdvModal from "./UpdateRdvModal";

function RdvTable() {
    const [currentPage, setCurrentPage]=useState(1) 
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
   
    const { appointments, loading } = useSelector(
        (state) => state.appointments
    );
  
    const itemsPerPage=5;
    const indexLast=currentPage * itemsPerPage;
    const indexFirst=indexLast - itemsPerPage;
    const totalPages= Math.ceil(appointments.length/itemsPerPage);
    const CurrentAppointments=appointments.slice(indexFirst, indexLast);

    const handleEdit = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (!isModalOpen) {
            dispatch(fetchappointments());
        }
    }, [isModalOpen, dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Do you really want to delete this appointment?")) {
            dispatch(deleteAappoitment(id));
        }
    };

    const handleUpdateSuccess = () => {
        dispatch(fetchappointments());
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                    Appointment List
                </h2>
            </div>

            <div className="overflow-x-auto">
                <UpdateRdvModal
                    key={selectedAppointment?.id}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    appointment={selectedAppointment}
                    onUpdated={handleUpdateSuccess}
                />
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Doctor</th>
                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Patient</th>
                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Date</th>
                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Time</th>
                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                            <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {CurrentAppointments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    No appointments found
                                </td>
                            </tr>
                        ) : (
                            CurrentAppointments.map((appoint) => (
                                <tr key={appoint.id} className="hover:bg-blue-50 transition-colors">
                                    <td className="py-5 px-6">{appoint?.doctor?.user?.name || "—"}</td>
                                    <td className="py-5 px-6">{appoint?.patient?.user?.name || "—"}</td>
                                    <td className="py-5 px-6">{appoint?.appointment_date || "—"}</td>
                                    <td className="py-5 px-6">{appoint?.appointment_time || "—"}</td>
                                    <td className="py-5 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium
                                                ${
                                                    appoint.status === "confirmed"
                                                        ? "bg-green-100 text-green-700"
                                                        : appoint.status === "cancelled"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {appoint.status}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 flex space-x-3">
                                        <button type="button" onClick={() => handleEdit(appoint)} className="p-2 text-green-600 hover:bg-green-100 rounded-lg">
                                            <Edit size={18} />
                                        </button>
                                        <button type="button" onClick={() => handleDelete(appoint.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="flex justify-end items-end mt-8">
                    <div className="flex items-center gap-2 px-4 py-2 ">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm 
                                transition duration-200
                                ${currentPage === 1 
                                    ? "text-gray-400 cursor-not-allowed opacity-50"
                                    : "text-gray-700 hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <span className="text-lg"><ChevronLeft/></span>
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            const page = i + 1;
                            if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 rounded-full text-sm transition duration-200
                                            ${currentPage === page 
                                                ? "bg-blue-500 text-white font-semibold shadow-md"
                                                : "text-gray-700 hover:bg-blue-100"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            }
                            if (page === currentPage - 2 || page === currentPage + 2)
                                return <span key={i} className="px-1 text-gray-600">•••</span>;
                            return null;
                        })}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm 
                                transition duration-200
                                ${currentPage === totalPages 
                                    ? "text-gray-400 cursor-not-allowed opacity-50"
                                    : "text-gray-700 hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <span className="text-lg"><ChevronRight/></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RdvTable;
