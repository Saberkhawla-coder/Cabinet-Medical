import React from "react";
import Footer from "../../pages/Footer";

export default function CommonDiseases() {

  const diseases = [
  {
    name: "Diabetes",
    desc: "Metabolic disorder that increases blood sugar levels.",
    img: "/images/diseases/diabetes.jpg",
    info: "Fatigue | Thirst | Weight loss"
  },
  {
    name: "Hypertension",
    desc: "High blood pressure, cardiovascular risk.",
    img: "/images/diseases/hypertension.jpg",
    info: "Stroke risk | Heart problems"
  },
  {
    name: "Flu",
    desc: "Viral infection of the respiratory system.",
    img: "/images/diseases/flu.jpg",
    info: "Fever | Cough | Chills"
  },
  {
    name: "Anxiety",
    desc: "Psychological disorder causing stress and worry.",
    img: "/images/diseases/anxiety.jpg",
    info: "Nervousness | Mental tension"
  },
  {
    name: "Obesity",
    desc: "Excessive accumulation of fat.",
    img: "/images/diseases/obesity.jpg",
    info: "Risk of diabetes | Hypertension"
  },
  {
    name: "Asthma",
    desc: "Chronic inflammation of the airways.",
    img: "/images/diseases/asthma.jpg",
    info: "Shortness of breath | Cough"
  }
];


  return (
    <>
    <div className=" w-[90%] mx-auto my-20">
      <h2 className="text-4xl font-bold text-green-800/50 text-center mb-14">
        Maladies les plus répandues
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {diseases.map((d, i) => (
          <div 
            key={i} 
            className="duration-500 overflow-hidden hover:-translate-y-2 cursor-pointer"
          >
            
   
            <div className="relative">
              <img 
                src={d.img} 
                alt={d.name}
                className="w-full h-56 object-cover transition duration-500 "
              />
              <div className="absolute left-0 right-0 bottom-[-1px] h-10 bg-white
                              rounded-t-[50%]"></div>
            </div>

     
            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-bold text-green-800/50 mt-3">{d.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{d.desc}</p>

          
              <div className="mt-4 border-t pt-3 text-gray-500 text-xs font-semibold">
                {d.info}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
    
  );
}
