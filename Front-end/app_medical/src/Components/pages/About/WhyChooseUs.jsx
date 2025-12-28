import React from 'react'
import { CalendarCheck, Users, ShieldCheck, Clock } from 'lucide-react'
import Footer from '../Footer'

function WhyChooseUs() {
  const features = [
    {
      icon: <CalendarCheck size={32} className="text-blue-600" />,
      title: "Gestion simple des rendez-vous",
      desc: "Planifiez, modifiez et suivez les rendez-vous médicaux en quelques clics, sans complications."
    },
    {
      icon: <Users size={32} className="text-blue-600" />,
      title: "Expérience patient améliorée",
      desc: "Offrez à vos patients une prise de rendez-vous rapide et une communication fluide."
    },
    {
      icon: <ShieldCheck size={32} className="text-blue-600" />,
      title: "Données sécurisées",
      desc: "Les informations médicales sont protégées avec des standards de sécurité élevés."
    },
    {
      icon: <Clock size={32} className="text-blue-600" />,
      title: "Gain de temps",
      desc: "Automatisez les tâches administratives et concentrez-vous sur l’essentiel : vos patients."
    }
  ]

  return (
    <><section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une solution moderne pensée pour les professionnels de santé et leurs patients.
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
