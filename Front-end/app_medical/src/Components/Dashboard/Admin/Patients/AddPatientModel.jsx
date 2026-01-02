import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPatient, fetchAllPatients } from "../../../../redux/slices/Patients/patientsSlice";
import { toast } from "sonner";

function AddPatientModel({ onClose, open }) {
  const dispatch = useDispatch();
//   const { patients } = useSelector((state) => state.patients);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    genre: "Homme",
  });

  if (!open) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addPatient(formData)).unwrap();
      toast.success("Patient added successfully!");
      dispatch(fetchAllPatients()); // Refresh list
      setFormData({ name: "", email: "", phone: "", date_of_birth: "", genre: "Homme" });
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add patient");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Add Patient</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
            <label className="text-gray-700 mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Gender</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            >
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Enfants">Enfants</option>
            </select>
          </div>
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

export default AddPatientModel;
