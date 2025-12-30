import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { fetchAllContact } from '../../../../redux/slices/Contact/allContact';

function ContactHistory() {
  const { loading, contacts, error } = useSelector((state) => state.contacts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentMessages = contacts.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

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
    <div className="m-8">
      <h1 className="text-2xl font-bold mb-6">Contact History</h1>
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
