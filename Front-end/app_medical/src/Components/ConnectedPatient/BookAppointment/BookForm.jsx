import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "../../../redux/slices/Doctors/allDoctors";
import { createAppointment, reset } from "../../../redux/slices/Appointments/appointmentSlice";

function BookForm() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.appointment);
//   const { user } = useSelector((state) => state.auth); 
  const { doctors } = useSelector((state) => state.doctors);

  const [form, setForm] = useState({
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAppointment(form)); 
  };

  useEffect(() => {
    dispatch(fetchAllDoctors());
    if (success) {
      alert(success);
      setTimeout(() => {
        setForm({ doctor_id: "", appointment_date: "", appointment_time: "" });
        dispatch(reset());
      }, 0);
    }
  }, [success, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Doctor</label>
            <select
              name="doctor_id"
              value={form.doctor_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-300 outline-none bg-white"
              required
            >
              <option value="">-- Select Doctor --</option>
              {doctors?.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc?.user?.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <div className="flex items-center border rounded-xl p-2 bg-gray-50">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="date"
                name="appointment_date"
                value={form.appointment_date}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-gray-700 px-2 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Time</label>
            <div className="flex items-center border rounded-xl p-2 bg-gray-50">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="time"
                name="appointment_time"
                value={form.appointment_time}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-gray-700 px-2 py-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-full text-lg hover:bg-green-700 transition-all hover:scale-105"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default BookForm;
