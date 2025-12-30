import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAappoitment } from "../../../../redux/slices/Appointments/CrudAppSlice";

function UpdateRdvModal({ open, onClose, appointment, onUpdated }) {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  const { patients } = useSelector((state) => state.patients);

  const [form, setForm] = useState(() => ({
    doctor_id: appointment?.doctor_id || "",
    patient_id: appointment?.patient_id || "",
    appointment_date: appointment?.appointment_date || "",
    appointment_time: appointment?.appointment_time || "",
    status: appointment?.status || "pending",
  }));

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAappoitment({ id: appointment.id, data: form }));
    onUpdated();         
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Update Appointment</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <select name="doctor_id" value={form.doctor_id} onChange={handleChange} className="border p-3 rounded-lg">
            <option value="">Select a doctor</option>
            {doctors?.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.user?.name}</option>
            ))}
          </select>
          <select name="patient_id" value={form.patient_id} onChange={handleChange} className="border p-3 rounded-lg">
            <option value="">Select a patient</option>
            {patients?.map((pat) => (
              <option key={pat.id} value={pat.id}>{pat.user?.name}</option>
            ))}
          </select>
          <input type="date" name="appointment_date" value={form.appointment_date} onChange={handleChange} className="border p-3 rounded-lg"/>
          <input type="time" name="appointment_time" value={form.appointment_time} onChange={handleChange} className="border p-3 rounded-lg"/>
          <select name="status" value={form.status} onChange={handleChange} className="border p-3 rounded-lg">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button type="submit" className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:scale-105 transition-all">Save</button>
        </form>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-sky-600 text-2xl font-bold">✕</button>
      </div>
    </div>
  );
}

export default UpdateRdvModal;
