import React from "react";
import BookForm from "./BookForm";

function BookAppointmentPage() {
  return (
    <div className="min-h-screen relative">
     
      <section className="relative w-full h-[70vh] flex justify-center items-center">
        <div className="absolute inset-0 bg-[url('/images/Healthy/bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-sky-200/30 backdrop-blur-sm"></div>

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Book an Appointment
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Fill out the form below to schedule your appointment with our doctors. 
            Our team will confirm your appointment as soon as possible.
          </p>
        </div>
      </section>

      
      <section className="-mt-32 md:-mt-55 relative z-10 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <BookForm />
        </div>
      </section>
    </div>
  );
}

export default BookAppointmentPage;
