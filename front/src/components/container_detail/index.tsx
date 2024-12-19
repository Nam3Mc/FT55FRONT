// "use client"

// react
import React from 'react';

// components
import BackButton from '@/components/back_button';
import CardDetail from '@/components/card_detail';
import DescriptionDetail from '@/components/description_detail';
import BookingDetail from '../booking_detail';
import Map from '../map';
import ReviewsContainer from '../reviews_container';
import { IProduct } from '@/interfaces/IProduct';



export const ContainerDetail: React.FC<IProduct> = (product) => {

  return (
    <div className="p-4">

      {/* Volver a la Home */}
      <BackButton />

      {/* Detalles de la Propiedad */}
      <CardDetail {...product}/>

      <div className='flex flex-col lg:flex-row lg:gap-8 lg:mx-12 mb-8'>
      {/* Descripción */}
      <div className='lg:w-1/2'>
        <DescriptionDetail {...product}/>
      </div>
      
      {/* Calendario y cantidad de viajeros */}
      <div className='lg:w-1/2'>
        <BookingDetail/>
      </div>

      </div>
      
      {/* Mapa */}
      <Map/>

      <hr className="border-t border-gray-300 my-4"/>

      <ReviewsContainer/>

    </div>
  );
}

export default ContainerDetail;