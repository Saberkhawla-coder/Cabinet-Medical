import React, { useEffect, useState } from 'react';
import { Eye, Edit, Trash2, Mail, Phone, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAllDoctors } from '../../../../redux/slices/Doctors/allDoctors';
import { useDispatch, useSelector } from 'react-redux';
import UpdateDocModel from './UpdateDocModel';
import { deleteDoctor, resetDeleteDoctor } from "../../../../redux/slices/Doctors/deleteDoctorSlice";
import { toast } from "sonner";

function DoctorsTable() {
  const { doctors, loading } = useSelector((state) => state.doctors);
  const [search,setSearch]=useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

      const filteredDoctors = doctors.filter(doc => {
        const matchesSearch =
          doc?.user?.name.toLowerCase().includes(search.toLowerCase()) ||
          doc?.user?.email.toLowerCase().includes(search.toLowerCase());

        const matchesSpecialty =
          specialtyFilter === 'All' || doc.speciality === specialtyFilter;

        return matchesSearch && matchesSpecialty;
      });
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentDoctor = filteredDoctors.slice(indexFirst, indexLast) 
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage) 

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-12 h-12 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    const first = parts[0]?.charAt(0) || '';
    const last = parts[parts.length - 1]?.charAt(0) || '';
    return (first + last).toUpperCase();
  };
  const handleEdit = (doc) => {
        setSelectedDoctor(doc);
        setIsModalOpen(true);
    };
    const handleDelete = async (doc) => {
  if (!window.confirm(`Are you sure you want to delete ${doc.user?.name}?`)) return;

  try {
    await dispatch(deleteDoctor(doc.id)).unwrap();
    toast.success("Doctor deleted successfully");
    dispatch(fetchAllDoctors()); 
    dispatch(resetDeleteDoctor());
  } catch (err) {
    toast.error(err?.message || "Delete failed");
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search a doctor by name, email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)} 
                    className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
             <option value="All">All Specialties</option>
              {[...new Set(doctors.map(doc => doc.speciality))].map((spec, idx) => (
                <option key={idx} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <UpdateDocModel open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                       doctor={selectedDoctor}/>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Doctor</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Contact</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Specialty</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentDoctor.map((doc) => (
              <tr key={doc.id} className="hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                <td className="py-5 px-6 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(doc.user?.name)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{doc.user?.name}</h3>
                    <p className="text-sm text-gray-500">ID: #{doc.id.toString().padStart(3,'0')}</p>
                  </div>
                </td>
                <td className="py-5 px-6 space-y-1">
                  <div className="flex items-center text-gray-600"><Mail className="w-4 h-4 mr-2" />{doc.user?.email}</div>
                </td>
                <td className="py-5 px-6 space-y-1">
                  <p>{doc.speciality}</p>
                </td>
                <td className="py-5 px-6 flex space-x-3">
                  <button type="button"  onClick={()=>handleEdit(doc)} className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-300"><Edit className="w-5 h-5" /></button>
                  <button  onClick={() => handleDelete(doc)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-300"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end items-end mt-8">
          <div className="flex items-center gap-2 px-4 py-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition duration-200 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed opacity-50" : "text-gray-700 hover:bg-blue-500 hover:text-white"}`}
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-full text-sm transition duration-200 ${currentPage === page ? "bg-blue-500 text-white font-semibold shadow-md" : "text-gray-700 hover:bg-blue-100"}`}
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
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition duration-200 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed opacity-50" : "text-gray-700 hover:bg-blue-500 hover:text-white"}`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorsTable;
