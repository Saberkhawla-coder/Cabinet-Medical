import React, { useRef } from "react";
import Footer from "../../Footer";

function AllMed() {
  const AllMeds = [
    { name: "Dr Anas El Hayal", sector: "Chirurgien Général", img: "/images/Doctor1.jpg" },
    { name: "Dr Abou Bakr Nabil", sector: "Ophtalmologue", img: "/images/Doctor2.jpg" },
    { name: "Dr Akesbi Jihane", sector: "Dentiste", img: "/images/Doctor6.jpg" },
    { name: "Dr John Doe", sector: "Médecin Général", img: "/images/Doctor3.jpg" },
    { name: "Dr Sarah Johnson", sector: "Cardiologue", img: "/images/Doctor4.jpg" },
    { name: "Dr Michael Chen", sector: "Neurologue", img: "/images/Doctor5.jpg" },
    { name: "Dr Sophie Martin", sector: "Pédiatre", img: "/images/Doctor7.jpg" },
   
  ];

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "auto" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "auto" });
    }
  };

  return (
    <>
    <div className=" w-full mx-auto px-2 sm:px-6 lg:px-8 py-20 relative">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Notre Équipe Médicale
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Des professionnels passionnés dédiés à offrir des soins médicaux modernes, fiables et humains. Notre équipe collabore pour garantir une expérience médicale fluide et rassurante.
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        {/* <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" /> */}
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-blue-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 border border-blue-100 flex items-center justify-center group"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-blue-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 border border-blue-100 flex items-center justify-center group"
        >
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Doctors Grid */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-8 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {AllMeds.map((doctor, index) => (
            <div key={index} className="flex-shrink-0 w-72 snap-center">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={doctor.img}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                    <span className="text-sm font-semibold text-blue-600">{doctor.sector}</span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{doctor.name}</h3>
                  <p className="text-gray-600 mb-4">{doctor.sector}</p>
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300">
                    Prendre Rendez-vous
                  </button>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
}

export default AllMed;
