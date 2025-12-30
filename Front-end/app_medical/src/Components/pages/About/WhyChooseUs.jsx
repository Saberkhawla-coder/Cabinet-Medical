import React from 'react'
import { CalendarCheck, Users, ShieldCheck, Clock } from 'lucide-react'
import Footer from '../Footer'

function WhyChooseUs() {
  const features = [
    {
      icon: <CalendarCheck size={32} className="text-blue-600" />,
      title: "Easy Appointment Management",
      desc: "Schedule, edit, and track medical appointments in just a few clicks, without any hassle."
    },
    {
      icon: <Users size={32} className="text-blue-600" />,
      title: "Enhanced Patient Experience",
      desc: "Provide your patients with quick appointment booking and smooth communication."
    },
    {
      icon: <ShieldCheck size={32} className="text-blue-600" />,
      title: "Secure Data",
      desc: "Medical information is protected with high security standards."
    },
    {
      icon: <Clock size={32} className="text-blue-600" />,
      title: "Time-Saving",
      desc: "Automate administrative tasks and focus on what matters most: your patients."
    }
  ]

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A modern solution designed for healthcare professionals and their patients.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
      <Footer/>
    </>
  )
}

export default WhyChooseUs
