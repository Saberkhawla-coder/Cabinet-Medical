import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctor, resetUpdateDoctor } from "../../../../redux/slices/Doctors/updateDoctorSlice";
import { fetchAllDoctors } from "../../../../redux/slices/Doctors/allDoctors";
import { toast } from "sonner";

function UpdateDocModel({ open, onClose, doctor }) {
  const dispatch = useDispatch();
  const { loading} = useSelector(
    (state) => state.updateDoctor
  );

  const [formData, setFormData] = useState({
    speciality: "",
    start_time: "",
    end_time: "",
    slot_duration: "",
    is_active: true,
    img: null,
  });

  useEffect(() => {
    setTimeout(()=>{
        if (doctor) {
      setFormData({
        speciality: doctor.speciality || "",
        start_time: doctor.start_time || "",
        end_time: doctor.end_time || "",
        slot_duration: doctor.slot_duration || "",
        is_active: doctor.is_active ?? true,
        img: null,
      });
    }
    },0)
    
  }, [doctor]);



  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      data.append(key, value);
    }
  });

  try {
    await dispatch(updateDoctor({ id: doctor.id, formData: data })).unwrap();
    toast.success("Doctor updated successfully");
    dispatch(fetchAllDoctors());
    dispatch(resetUpdateDoctor());
    onClose();
  } catch (err) {
    toast.error(err?.message || "Update failed");
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Doctor</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="speciality" value={formData.speciality} onChange={handleChange} placeholder="Speciality" className="border p-3 rounded-lg" />
          <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} className="border p-3 rounded-lg" />
          <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} className="border p-3 rounded-lg" />
          <input type="number" name="slot_duration" value={formData.slot_duration} onChange={handleChange} placeholder="Slot duration (min)" className="border p-3 rounded-lg" />

          <label className="flex items-center gap-2">
            <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
            Active
          </label>

          <input type="file" name="img" accept="image/*" onChange={handleChange} className="border p-3 rounded-lg" />

          <button disabled={loading} className="bg-blue-600 text-white p-3 rounded-lg">
            {loading ? "Saving..." : "Save"}
          </button>
        </form>

        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-500 hover:text-red-500">
          ✕
        </button>
      </div>
    </div>
  );
}

export default UpdateDocModel;
