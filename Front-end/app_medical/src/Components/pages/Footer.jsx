import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Health Clinic
              </span>
            </h2>
            <p className="text-gray-600">
              We provide reliable and modern medical care with a team of passionate professionals.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Consultations</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Appointments</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Emergency</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Teleconsultation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-blue-600 hover:text-teal-500 transition-colors"><FaFacebookF /></Link>
              <Link to="#" className="text-blue-400 hover:text-teal-500 transition-colors"><FaTwitter /></Link>
              <Link to="#" className="text-pink-500 hover:text-teal-500 transition-colors"><FaInstagram /></Link>
              <Link to="#" className="text-blue-700 hover:text-teal-500 transition-colors"><FaLinkedinIn /></Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Health Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
