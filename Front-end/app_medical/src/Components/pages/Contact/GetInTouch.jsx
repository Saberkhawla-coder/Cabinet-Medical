import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import ContactFormMap from './ContactFormMap'

function GetInTouch() {
  return (
    <><section className="relative z-20 -mt-25">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Phone */}
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500">
              <Phone className="text-white" size={28} />
            </div>
            <h3 className="text-xl text-gray-700 font-semibold mb-2">
              Téléphone
            </h3>
            <p className="text-gray-600">
              +212 6 12 34 56 78
            </p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500">
              <Mail className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Email
            </h3>
            <p className="text-gray-600">
              contact@healthcare.com
            </p>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500">
              <MapPin className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Localisation
            </h3>
            <p className="text-gray-600">
              Casablanca, Maroc
            </p>
          </div>

        </div>

      </div>
    </section>
    <ContactFormMap/>
    </>
    
  )
}

export default GetInTouch
