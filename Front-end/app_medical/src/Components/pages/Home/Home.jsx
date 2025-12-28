import React, { useState, useEffect } from "react";
import Sante from "./Sectors";
import Sectors from "./Sectors";
import {Link} from 'react-router-dom'
function Home() {
  const images = [
    "/images/HomeAnimation/MedImg0.jpg",
    "/images/HomeAnimation/MedImg2.jpg",
    "/images/HomeAnimation/MedImg3.jpg",
    "/images/HomeAnimation/MedImg4.jpg",
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
    <div className="flex flex-col md:flex-row sm:flex-col items-center justify-between gap-12 p-12 h-screen bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 rounded-xl  ">
      
      <div className="w-full md:w-1/2 flex flex-col justify-center mt-20">
      <h6
  className="md:text-5xl font-extrabold mx-auto mb-6 leading-tight text-center
             bg-gradient-to-r from-blue-600 to-teal-500
             bg-clip-text text-transparent
             animate-heartbeat"
>
  Des solutions <br /> intelligentes pour vous
</h6>

        <p
          className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 text-center
                    animate-heartbeat-slow"
        >
          Simplifiez la gestion de votre cabinet médical, optimisez vos rendez-vous et
          améliorez le suivi de vos patients grâce à une interface moderne et intuitive.
        </p>

        <button className="bg-gradient-to-r from-blue-600 to-teal-500 w-50 mx-auto cursor-pointer text-white font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-300">
          <Link to='/login'>Se connecter</Link>
          
        </button>
      </div>

      <div className="w-full md:w-1/2 relative flex justify-center items-center mt-10 md:mt-20">
        <img
          src={images[currentImg]}
          alt="photo"
          style={{borderRadius:"50%"}}
          className="w-96 h-96 md:w-[28rem] md:h-[28rem] object-cover rounded-full shadow-2xl  transition-transform duration-700 ease-in-out hover:scale-105"
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
