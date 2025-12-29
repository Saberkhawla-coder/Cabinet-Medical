import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import { Mail, Phone, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchMyDoctorPatients } from "../../../../redux/slices/Doctors/myPatientsSlice";


function PatientTableDoc() {
    const {loading,error, patients: myPatients}=useSelector((state)=>state.myPatients)
    
    const [currentPage,setCurrentPage]=useState(1)
    const itemsPerPage=5;
    const indexLast=currentPage * itemsPerPage;
    const indexFirst=indexLast- itemsPerPage;
    const currentPatients=myPatients.slice(indexFirst,indexLast)
    const totalPages=Math.ceil(myPatients.length/itemsPerPage)
    
    const dispatch=useDispatch() 
    useEffect(()=>{
       dispatch(fetchMyDoctorPatients()) ;
    },[dispatch])

    if (loading){
        return <div className="flex justify-center items-center h-full">
                <div className="w-12 h-12 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
    }
    if(error){
        return <div>{error}</div>
    }

    

 
   
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
  
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-end space-y-4 md:space-y-0">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un patient par nom, prénom, email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

     
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Patient</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Coordonnées</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Informations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                <td className="py-5 px-6 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {patient.user?.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{patient.user?.name} </h3>
                    <p className="text-sm text-gray-500">ID: #{patient.id.toString().padStart(3,'0')}</p>
                  </div>
                </td>
                <td className="py-5 px-6 space-y-1">
                  <div className="flex items-center text-gray-600"><Mail className="w-4 h-4 mr-2" />{patient.user?.email}</div>
                  <div className="flex items-center text-gray-600"><Phone className="w-4 h-4 mr-2" />{patient.phone}</div>
                </td>
                <td className="py-5 px-6 space-y-1">
                  <p><span className="font-medium">Né(e) le:</span> {patient.date_of_birth}</p>
                  <p><span className="font-medium">Genre:</span> {patient?.genre}</p>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-end mt-8">



        <div className="flex items-center gap-2 px-4 py-2 ">
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
                              <span className="text-lg"><ChevronLeft/></span>
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
                <span className="text-lg"><ChevronRight/></span>
            </button>
        </div>

      </div>
      </div>

      
    </div>
  );
}

export default PatientTableDoc;
