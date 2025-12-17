import React from 'react'
import Sante from '/public/images/Sante.jpg'
import { Link } from 'react-router-dom'
import SectionAbout from './SectionAbout'

function About() {
  return (
    <>
    <div className="relative w-full h-[400px] overflow-hidden">
      
      <img
        src={Sante}
        alt="About us background"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center">
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          About Us
        </h1>

        <div className="flex items-center gap-2 text-white/80 text-sm">
          <Link to="/" className="hover:text-[#4DA3FF] transition">
            Home
          </Link>
          <span>/</span>
          <Link to="/about" className="text-[#4DA3FF] font-medium">
            About Us
          </Link>
        </div>

      </div>

    </div>
    <SectionAbout/>
    </>
    
  )
}

export default About
