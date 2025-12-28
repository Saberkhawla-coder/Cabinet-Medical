import React from "react";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import AllMed from "./AllMed";

function InfosMed() {
  return (
    <>
    <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 py-20 px-6 ">
      <div className="max-w-7xl h-70 mx-auto flex flex-col md:flex-row items-center justify-around gap-14">
        
       
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex-shrink-0">
          <img
            src="/images/HomeAnimation/MedImg.jpg"
            alt="doctor"
            className="w-full h-full absolute top-25  object-cover rounded-full shadow-xl border-4 border-white"
          />
        </div>


        <div className="md:w-1/2 text-gray-800  flex flex-col justify-end ">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6">
            Qui nous sommes
          </h1>

          <p className="text-lg leading-relaxed mb-10 text-left">
            Nous sommes un cabinet médical moderne qui allie soins de qualité et gestion simplifiée. 
            Notre mission est de rendre le travail des professionnels plus efficace, 
            tout en offrant un suivi optimal aux patients.
          </p>

       
          <div className="space-y-6 text-lg">

           
            <div className="flex items-start gap-4 relative">
              <div className="relative">
                <RiNumber1 size={32} className="text-gray-700 bg-gray-200 p-1 rounded-full" />
                <div className="absolute left-1/2 -translate-x-1/2 top-8 w-0.5 h-10 bg-gray-300"></div>
              </div>
              <span className="pt-1">Offrir des soins de qualité aux patients.</span>
            </div>

         
            <div className="flex items-start gap-4 relative">
              <div className="relative">
                <RiNumber2 size={32} className="text-gray-700 bg-gray-200 p-1 rounded-full" />
                <div className="absolute left-1/2 -translate-x-1/2 top-8 w-0.5 h-10 bg-gray-300"></div>
              </div>
              <span className="pt-1">Simplifier la gestion du cabinet pour les professionnels.</span>
            </div>

        
            <div className="flex items-start gap-4 relative">
              <div className="relative">
                <RiNumber3 size={32} className="text-gray-700 bg-gray-200 p-1 rounded-full" />
                <div className="absolute left-1/2 -translate-x-1/2 top-8 w-0.5 h-6 bg-gray-300"></div>
              </div>
              <span className="pt-1">Centraliser et sécuriser les dossiers patients.</span>
            </div>

            
            <div className="flex items-start gap-4">
              <RiNumber4 size={32} className="text-gray-700 bg-gray-200 p-1 rounded-full" />
              <span className="pt-1">Améliorer le suivi et la communication avec les patients.</span>
            </div>

          </div>
        </div>
      </div>
    </div>

    <AllMed/>
    </>
    
  );
}

export default InfosMed;
