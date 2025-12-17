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
    title: "Santé Mentale",
    desc: "Branche médicale dédiée au diagnostic, au traitement et à la prévention des troubles psychologiques et émotionnels.",
  },
  {
    icon: <FaHeartbeat size={35} className="text-red-500" />,
    title: "Cardiologie",
    desc: "Spécialité qui étudie les maladies du cœur et des vaisseaux sanguins et assure leur prise en charge médicale.",
  },
  {
    icon: <FaWalking size={35} className="text-green-500" />,
    title: "Médecine Générale",
    desc: "Discipline centrée sur la prise en charge globale du patient, assurant diagnostic, suivi et prévention des maladies.",
  },
  {
    icon: <FaXRay size={35} className="text-purple-500" />,
    title: "Radiologie",
    desc: "Spécialité utilisant l’imagerie médicale pour observer l’intérieur du corps et établir des diagnostics précis.",
  },
  {
    icon: <FaChild size={35} className="text-yellow-500" />,
    title: "Pédiatrie",
    desc: "Branche qui traite la santé et le développement des nourrissons, enfants et adolescents.",
  },
  {
    icon: <FaTeeth size={35} className="text-gray-500" />,
    title: "Dentisterie",
    desc: "Science spécialisée dans le diagnostic, le traitement et la prévention des maladies bucco-dentaires.",
  },
  {
    icon: <FaEye size={35} className="text-indigo-500" />,
    title: "Ophtalmologie",
    desc: "Spécialité dédiée aux maladies et anomalies des yeux et du système visuel.",
  },
  {
    icon: <FaLungs size={35} className="text-teal-500" />,
    title: "Pneumologie",
    desc: "Discipline médicale qui s’occupe des maladies des poumons et du système respiratoire.",
  }
];


  return (
    <>
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6">
          Nos Secteurs Médicaux
        </h2>
        <p className="text-center text-gray-500 text-lg mb-12">
          Découvrez nos domaines de soins adaptés pour tous vos besoins.
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
