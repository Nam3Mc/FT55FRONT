// react
import React from 'react';

// next
import Image from 'next/image';

import casa from '../../assets/casaprueba.jpeg'
import persona from '../../assets/persona.jpeg'
import { IProduct } from '@/interfaces/IProduct';
import ImageCarousel from '../carousel_prop';

export const CardDetail: React.FC<IProduct> = (product) => {
return (
    <div className="flex flex-col md:flex-row border-2 border-marble p-4 rounded-lg shadow-md mb-6 lg:mx-40">
         {/* Imagen con boton corazón */}
         <div className="relative md:w-1/2">
          <button className="absolute hover:scale-110 top-3 right-3 z-10">
            <i className="fi fi-rr-heart  bg-white rounded-lg p-2 shadow-md "></i>
          </button>
        
         <ImageCarousel {...product}/>
        </div>

        {/* Contenido */}
        <div className="md:w-1/2 w-full p-4 bg-pearl">
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <h3 className="text-lg font-medium mb-2">{product.city} / {product.state}</h3>
          <p className="text-gray-600 mb-2">{product.capacity} Huéspedes | {product.bedrooms} Dormitorios | {product.bathrooms} Baños</p>
          <p className="text-lg font-bold mb-2">${product.price} por noche</p>
          <p className="text-gray-600 mb-2">
            Check-in: {product.checkin} | Check-out: {product.checkout}
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
            <span className="text-gray-800">{product.owner}</span>
          </div>
        </div>
    </div>
)
}

export default CardDetail