import React from 'react'
import { Link } from 'react-router-dom'
import AboutImg from '/images/HomeAnimation/MedImg.jpg'
import WhyChooseUs from './WhyChooseUs'

function SectionAbout() {
  return (
    <><section className="py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
        
        <div className="md:w-1/2">
          <img 
            src={AboutImg} 
            alt="Gestion de rendez-vous médicaux" 
            className="rounded-lg shadow-lg  w-full h-full"
          />
        </div>

       
        <div className="md:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800/50">
            Simplifiez la gestion des rendez-vous médicaux
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Notre plateforme vous permet de gérer facilement les rendez-vous de vos clients, suivre leurs dossiers médicaux et organiser les traitements et prescriptions. 
            Tout est centralisé pour vous faire gagner du temps et améliorer l’expérience de vos patients.
          </p>

          <Link 
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 w-50 text-center  hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Contactez-nous
          </Link>
        </div>

      </div>
    </section>
    <WhyChooseUs/>
    </>
    
  )
}

export default SectionAbout
