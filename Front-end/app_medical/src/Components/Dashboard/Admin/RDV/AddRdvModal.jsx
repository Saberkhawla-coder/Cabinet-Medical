import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAappoitment } from "../../../../redux/slices/Appointments/CrudAppSlice";
import { fetchAllDoctors } from "../../../../redux/slices/Doctors/allDoctors";
import { fetchAllPatients } from "../../../../redux/slices/Patients/patientsSlice";

function AddRdvModal({ open, onClose }) {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  const { patients } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchAllPatients());
  }, [dispatch]);

  const [form, setForm] = useState({
    doctor_id: "",
    patient_id: "",
    appointment_date: "",
    appointment_time: "",
    status: "pending",
  });

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAappoitment(form));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/100 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Add Appointment</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Doctor</label>
            <select
              name="doctor_id"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-black bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>{doc.user.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Patient</label>
            <select
              name="patient_id"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            >
              <option value="">Select a patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.user.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 mb-1 font-medium">Appointment Date</label>
              <input
                type="date"
                name="appointment_date"
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 mb-1 font-medium">Time</label>
              <input
                type="time"
                name="appointment_time"
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Status</label>
            <select
              name="status"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold p-3 rounded-lg hover:scale-105 transform transition-all duration-300 shadow-md"
          >
            Save
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-sky-600 text-2xl font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AddRdvModal;
