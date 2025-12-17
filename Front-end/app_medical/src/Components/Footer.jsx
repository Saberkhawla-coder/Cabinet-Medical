import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Clinique Santé
              </span>
            </h2>
            <p className="text-gray-600">
              Nous offrons des soins médicaux fiables et modernes avec une équipe de professionnels passionnés.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Consultations</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Rendez-vous</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Urgences</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Téléconsultation</a></li>
            </ul>
          </div>

          {/* Liens Utiles */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Politique de confidentialité</a></li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-teal-500 transition-colors"><FaFacebookF /></a>
              <a href="#" className="text-blue-400 hover:text-teal-500 transition-colors"><FaTwitter /></a>
              <a href="#" className="text-pink-500 hover:text-teal-500 transition-colors"><FaInstagram /></a>
              <a href="#" className="text-blue-700 hover:text-teal-500 transition-colors"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Clinique Santé. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
