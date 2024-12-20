"use client"
// react
import React, { useState } from 'react';

// next
import Image from 'next/image';

import casa from '../../assets/casaprueba.jpeg'
import persona from '../../assets/persona.jpeg'
import { IProperty } from '@/interfaces/IProperty';
import ImageCarousel from '../carousel_prop';
import { user } from '@/helpers/data';

interface IPropsDetail {
  property : IProperty;
  owner?: user
}

export const CardDetail: React.FC<IPropsDetail> = ({property, owner}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };
return (
    <div className="flex flex-col md:flex-row border-2 border-marble p-4 rounded-lg shadow-md mb-6 lg:mx-40">
         {/* Imagen con boton corazón */}
         <div className="relative md:w-1/2">
          <button 
              className="absolute hover:scale-110 top-3 right-3 z-10"
              onClick={toggleFavorite}>
                {!isFavorite ? <i className={`fi fi-rr-heart bg-white rounded-lg p-2 shadow-md`}></i> : <i className={`fi fi-sr-heart bg-white rounded-lg p-2 shadow-md text-red-500`}></i>}
          </button>
        
         <ImageCarousel {...property}/>
        </div>

        {/* Contenido */}
        <div className="md:w-1/2 w-full p-4 bg-pearl">
          <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
          <h3 className="text-lg font-medium mb-2">{property.city} / {property.state}</h3>
          <p className="text-gray-600 mb-2">{property.capacity} Huéspedes | {property.bedrooms} Dormitorios | {property.bathrooms} Baños</p>
          <p className="text-lg font-bold mb-2">${property.price} por noche</p>
          <div className='flex'>
          <i className="fi fi-ss-star text-yellow-500"></i>
          <p>{property.rating}</p>

          </div>
          <div className="flex items-center mt-10">
          {owner?.photo && (
            <Image
              src={owner.photo}
              alt="Propietario"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full mr-2"
            />
          )}
            <span className="text-gray-800">{owner?.name} {owner?.lastName}</span>
          </div>
        </div>
    </div>
)
}

export default CardDetail