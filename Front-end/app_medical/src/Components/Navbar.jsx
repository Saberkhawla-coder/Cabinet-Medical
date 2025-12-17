import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed z-50 transition-all duration-500 ease-out
        ${scrolled
          ? 'bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-lg px-8 py-4 rounded-full flex items-center gap-12'
          : 'top-0 left-0 w-full bg-transparent text-[#4DA3FF] px-6 py-4 flex justify-between items-center shadow-md'
        }
      `}
    >
      <Link to="/" className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
        Health<span className="">Care</span>
      </Link>

      <div className="flex gap-8">
        <Link to="/" className="hover:text-[#4DA3FF]">Home</Link>
        <Link to="/about" className="hover:text-[#4DA3FF]">About</Link>
        <Link to="/contact" className="hover:text-[#4DA3FF]">Contact</Link>
      </div>
    </nav>
  )
}

export default Navbar
