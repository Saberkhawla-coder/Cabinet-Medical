import React from 'react';
import { Link } from 'react-router-dom';
import GetInTouch from './GetInTouch';

function Contact() {
  return (
    <>
    
      <div className="relative w-full h-[70vh] flex justify-center items-center">
      <div className="absolute inset-0 bg-[url('/images/Healthy/bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-sky-200/30 backdrop-blur-sm"></div>

        <div  className="relative max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Contact Us
          </h1>

          <div className="flex items-center justify-center gap-2 text-gray-700 text-lg max-w-2xl mx-auto md:text-base">
            <Link to="/" className="hover:underline transition">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <GetInTouch />
    </>
  );
}

export default Contact;
