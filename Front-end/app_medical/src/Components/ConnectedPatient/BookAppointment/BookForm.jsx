import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "../../../redux/slices/Doctors/allDoctors";
import { createAppointment, reset } from "../../../redux/slices/Appointments/appointmentSlice";
import { useLocation } from "react-router";
import { toast } from "sonner";

function BookForm() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.appointment);
//   const { user } = useSelector((state) => state.auth); 
  const { doctors } = useSelector((state) => state.doctors);
const location = useLocation();
  const doctorId = location.state?.doctorId || ""; 
  const [form, setForm] = useState({
    doctor_id: doctorId||"",
    appointment_date: "",
    appointment_time: "",
    phone: "",
    date_birth: "",
    genre:"Homme"
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
      toast.success(success);
      setTimeout(() => {
        setForm({ doctor_id: "", appointment_date: "", appointment_time: "" ,phone: "",
        date_birth: "",genre:"Homme"});
        dispatch(reset());
      }, 0);
    }
  }, [success, dispatch]);
  useEffect(() => {
    if (doctorId) {
        setTimeout(()=>{
             setForm((prev) => ({ ...prev, doctor_id: doctorId }));
        },0)
     
    }
  }, [doctorId]);
  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
                placeholder="Enter your phone number"
                required
            />
            </div>

            <div>
            <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
            <input
                type="date"
                name="date_birth"
                value={form.date_birth}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
                required
            />
            </div>
           <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Homme"
                  checked={form.gender === "Homme"}
                  onChange={handleChange}
                  className="accent-sky-600"
                />
                Male
              </label>
   <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Femme"
                  checked={form.gender === "Femme"}
                  onChange={handleChange}
                  className="accent-sky-600"
                />
                Female
              </label>
   <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Enfants"
                  checked={form.gender === "Enfants"}
                  onChange={handleChange}
                  className="accent-sky-600"
                />
                Child
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Doctor</label>
             <select
                name="doctor_id"
                value={form.doctor_id}
                onChange={handleChange}
                className="w-full border ... p-3 rounded-xl"
                required
            >
                <option value="">Select Doctor</option>
                {doctors?.map((doc) => (
                <option key={doc.id} value={doc.id}>
                    {doc.user?.name}
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
