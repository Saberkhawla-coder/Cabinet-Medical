import React, { useState } from "react";
import { Calendar, Clock, User } from "lucide-react";

function BookForm() {
     const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", form);
  };
  return (
    <div> 
         <div className="min-h-screen flex flex-col items-center py-12">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-lg p-8 md:p-12">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <div className="flex items-center border rounded-xl p-2 bg-gray-50">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-transparent outline-none text-gray-700 px-2 py-2"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-300 outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+212 6 XX XX XX XX"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-300 outline-none"
              required
            />
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Doctor</label>
            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-300 outline-none bg-white"
              required
            >
              <option value="">Choose a doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Johnson">Dr. Johnson</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <div className="flex items-center border rounded-xl p-2 bg-gray-50">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-700 px-2 py-2"
                  required
                />
              </div>
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-gray-700 font-medium mb-2">Time</label>
              <div className="flex items-center border rounded-xl p-2 bg-gray-50">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-700 px-2 py-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-full text-lg hover:bg-green-700 transition-all hover:scale-105"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default BookForm