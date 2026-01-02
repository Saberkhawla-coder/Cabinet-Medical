import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {Search} from 'lucide-react'
import { fetchAllContact } from '../../../../redux/slices/Contact/allContact';

function ContactHistory() {
  const { loading, contacts, error } = useSelector((state) => state.contacts);
  const [currentPage, setCurrentPage] = useState(1);
  const [search,setSearch]=useState('')
  const itemsPerPage = 5;

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const filterByNameEmail=contacts.filter((c)=>c?.name.toLowerCase().includes(search.toLowerCase()))
  const currentMessages = filterByNameEmail.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filterByNameEmail.length / itemsPerPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContact());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-12 h-12 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  return (
    <div className=" bg-white p-4 rounded-xl ">
    <div className="relative max-w-md m-4 ml-auto">
    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search a contact by name..."
      className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 "
    />
  </div>



      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((msg) => (
              <tr key={msg.id} className="border-b border-gray-200 hover:bg-blue-50 transition">
                <td className="p-4">{msg.name.charAt(0).toUpperCase() + msg.name.slice(1).toLowerCase()}</td>
                <td className="p-4">{msg.email}</td>
                <td className="p-4">{msg.phone}</td>
                <td className="p-4">{msg.message}</td>
                <td className="p-4">{new Date(msg.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end items-end mt-8">
          <div className="flex items-center gap-2 px-4 py-2">
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
              <span className="text-lg"><ChevronLeft /></span>
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
              <span className="text-lg"><ChevronRight /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactHistory;
