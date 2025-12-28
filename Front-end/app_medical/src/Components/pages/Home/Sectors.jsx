// Sectors.jsx
import React from "react";
import {
  FaBrain,
  FaHeartbeat,
  FaWalking,
  FaXRay,
  FaChild,
  FaTeeth,
  FaEye,
  FaLungs
} from "react-icons/fa";
import InfosMed from "./InfosMed";

export default function Sectors() {
 const sectors = [
  {
    icon: <FaBrain size={35} className="text-blue-500" />,
    title: "Mental Health",
    desc: "A medical field focused on diagnosing, treating, and preventing psychological and emotional disorders.",
  },
  {
    icon: <FaHeartbeat size={35} className="text-red-500" />,
    title: "Cardiology",
    desc: "A specialty that studies heart and blood vessel diseases and provides medical care for cardiovascular conditions.",
  },
  {
    icon: <FaWalking size={35} className="text-green-500" />,
    title: "General Medicine",
    desc: "A discipline that offers global patient care, including diagnosis, follow-up, and disease prevention.",
  },
  {
    icon: <FaXRay size={35} className="text-purple-500" />,
    title: "Radiology",
    desc: "A specialty using medical imaging to observe inside the body and support accurate diagnosis.",
  },
  {
    icon: <FaChild size={35} className="text-yellow-500" />,
    title: "Pediatrics",
    desc: "A branch of medicine focused on the health and development of infants, children, and teenagers.",
  },
  {
    icon: <FaTeeth size={35} className="text-gray-500" />,
    title: "Dentistry",
    desc: "A science specialized in diagnosing, treating, and preventing oral and dental diseases.",
  },
  {
    icon: <FaEye size={35} className="text-indigo-500" />,
    title: "Ophthalmology",
    desc: "A specialty dedicated to diseases and disorders of the eyes and the visual system.",
  },
  {
    icon: <FaLungs size={35} className="text-teal-500" />,
    title: "Pulmonology",
    desc: "A medical discipline focused on diseases of the lungs and the respiratory system.",
  }
];



  return (
    <>
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6">
            Our Most Popular Medical Sectors
        </h2>
        <p className="text-center text-gray-500 text-lg mb-12">
          Discover our healthcare fields designed to meet all your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {sectors.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-center text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <InfosMed/>
    </>
    
  );
}
