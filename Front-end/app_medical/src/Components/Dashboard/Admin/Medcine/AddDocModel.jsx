import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDoctor, resetCreateDoctor } from "../../../../redux/slices/Doctors/addDoctors";
import { fetchAllDoctors } from "../../../../redux/slices/Doctors/allDoctors";
import { toast } from "sonner";

function AddDocModel({ open, onClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.createDoctor);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    start_time: "",
    end_time: "",
    slot_duration: "",
    is_active: true,
    img: null,
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
Object.entries(formData).forEach(([key, value]) => {
  if (value !== null && value !== "") {
    if (key === "is_active") {
      data.append(key, value ? 1 : 0);
    } else {
      data.append(key, value);
    }
  }
});
    try {
      await dispatch(createDoctor(data)).unwrap();
      toast.success("Doctor ajouté avec succès");
      dispatch(fetchAllDoctors());
      dispatch(resetCreateDoctor());
      onClose();

      setFormData({
        name: "",
        email: "",
        password: "",
        speciality: "",
        start_time: "",
        end_time: "",
        slot_duration: "",
        is_active: true,
        img: null,
      });
    } catch (err) {
      toast.error(err?.message || "Erreur lors de l'ajout");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajouter un Doctor</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nom et Email */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Specialty */}
          <input
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            placeholder="Speciality"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Horaires */}
          <div className="flex gap-3">
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Slot duration */}
          <input
            type="number"
            name="slot_duration"
            value={formData.slot_duration}
            onChange={handleChange}
            placeholder="Slot duration (min)"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Active */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-600"
            />
            Active
          </label>

          {/* Image */}
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Submit */}
          <button
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold p-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {loading ? "Saving..." : "Add Doctor"}
          </button>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AddDocModel;
