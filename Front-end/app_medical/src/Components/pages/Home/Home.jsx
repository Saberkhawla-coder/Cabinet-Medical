import React, { useState, useEffect } from "react";
import Sante from "./Sectors";
import Sectors from "./Sectors";
import {Link} from 'react-router-dom'
function Home() {
  const images = [
    "/images/MedImg0.jpg",
    "/images/MedImg2.jpg",
    "/images/MedImg3.jpg",
    "/images/MedImg4.jpg",
  ];
  const [currentImg, setCurrentImg] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, [images.length]);

  return (
    <>
    <div className="flex flex-col md:flex-row sm:flex-col  items-center justify-between gap-12 p-12 my-10 max-w-7xl mx-auto bg-linear-to-r from-white via-gray-50 to-white rounded-xl  bg-amber-600">
      
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h6 className="md:text-5xl font-extrabold mx-auto w-140 text-gray-900 mb-6 leading-tight text-center">
          Des solutions <br />intelligentes pour vous
        </h6>

        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-8">
          Simplifiez la gestion de votre cabinet médical, optimisez vos rendez-vous et améliorez le suivi de vos patients grâce à une interface moderne et intuitive.
        </p>
        <button className="bg-[#4DA3FF] w-50 mx-auto cursor-pointer text-white font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-300">
          <Link to='/login'>Se connecter</Link>
          
        </button>
      </div>

      <div className="w-full md:w-1/2 relative flex justify-center items-center mt-10 md:mt-0">
        <img
          src={images[currentImg]}
          alt="photo"
          className="w-72 h-72 md:w-96 md:h-96 rounded-2xl object-cover shadow-2xl transition-transform duration-700 ease-in-out hover:scale-105"
        />

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
         {images.map((_, index) => {
            const colorsActive = ["bg-yellow-400", "bg-blue-500", "bg-red-500", "bg-gray-400"];
            const colorsInactive = ["bg-yellow-300", "bg-blue-400", "bg-red-400","bg-gray-300"];

            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                  currentImg === index ? `scale-125 shadow-lg ${colorsActive[index]}` : colorsInactive[index]
                }`}
                onClick={() => setCurrentImg(index)}
              ></div>
            );
          })}

        </div>
      </div>
    </div>
    <Sectors/>
    </>
    
  );
}

export default Home;
