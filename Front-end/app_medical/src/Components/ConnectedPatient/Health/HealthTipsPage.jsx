import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import HealthyInfos from "./HealthyInfos";

export default function HealthTipsPage() {
  const heroContents = [
    {
      title: "Take Control of Your Health",
      highlight: "Health",
      text: "Short medical advice and guidance to keep your body and mind healthy.",
      btn: "Book Appointment"
    },
    {
      title: "Stay Healthy, Stay Strong",
      highlight: "Strong",
      text: "Discover daily health tips and wellness routines for a better life.",
      btn: "Start Today"
    },
    {
      title: "Your Wellness Matters",
      highlight: "Wellness",
      text: "Explore trusted information to improve your physical and mental well-being.",
      btn: "Learn More"
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroContents.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const current = heroContents[index];

  return (
    <div className="min-h-screen">
      

      <section className="relative w-full h-[70vh] flex justify-center items-center">
        
        <div className="absolute inset-0 bg-[url('/images/Healthy/bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-sky-200/30 backdrop-blur-sm"></div>


        <div className="relative max-w-5xl mx-auto text-center px-6 transition-all duration-500 ease-in-out">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            {current.title.replace(current.highlight, "")}
            <span className="text-green-600"> {current.highlight}</span>
          </h1>

          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            {current.text}
          </p>

          <Link
            to="/bookAppointment"
            className="inline-flex items-center gap-2 mt-6 bg-green-600 text-white px-6 py-2 rounded-full text-base font-medium hover:bg-green-700 transition-all hover:scale-105"
          >
            <Phone size={18} />
            {current.btn}
          </Link>
        </div>
      </section>

      <div >
        <HealthyInfos />
      </div>

    </div>
  );
}
