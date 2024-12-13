// react
import React from 'react';

// next
import Image from 'next/image';

import casa from '../../assets/casaprueba.jpeg'
import persona from '../../assets/persona.jpeg'

export const CardDetail: React.FC = () => {
return (
    <div className="flex flex-col md:flex-row border-2 border-marble p-4 rounded-lg shadow-md mb-6 lg:mx-40">
         {/* Imagen con boton corazón */}
         <div className="relative md:w-1/2">
          <button className="absolute hover:scale-110 top-3 right-2 ">
            <i className="fi fi-rr-heart  bg-white rounded-lg p-2 shadow-md "></i>
          </button>
        
          <Image
            src={casa}
            alt="Propiedad"
            className="rounded-lg object-cover h-64 w-full"
          />
        </div>


        {/* Contenido */}
        <div className="md:w-1/2 w-full p-4 bg-pearl">
          <h2 className="text-xl font-semibold mb-2">Lugar</h2>
          <p className="text-gray-600 mb-2">4 Huéspedes | 2 Dormitorios | 3 Camas</p>
          <p className="text-lg font-bold mb-2">$120 por noche</p>
          <p className="text-gray-600 mb-2">
            Check-in: 12:00 PM | Check-out: 10:00 AM
          </p>
          <div className='flex'>
          <i className="fi fi-ss-star text-yellow-500"></i>
          <i className="fi fi-ss-star text-yellow-500"></i>
          <i className="fi fi-ss-star text-yellow-500"></i>
          <i className="fi fi-ss-star text-yellow-500"></i>
          <i className="fi fi-ss-star text-yellow-500"></i>

          </div>
          <div className="flex items-center mt-10">
            <Image
              src={persona}
              alt="Propietario"
              className="h-10 w-10 rounded-full mr-2"
            />
            <span className="text-gray-800">Nombre del propietario</span>
          </div>
        </div>
    </div>
)
}

export default CardDetail