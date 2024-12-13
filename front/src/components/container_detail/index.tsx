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



export const ContainerDetail: React.FC = () => {
console.log("eestoy en el contenedor");

    const propiedadPrueba = {
        place: "Bogotá, Colombia",
        guests: 4,
        bedrooms: 2,
        beds: 3,
        price: 10,
        checkin:"",
        checkout:"",
        owner: "user",
        img:[""],
        description:"Descubre esta encantadora casa ubicada en el corazón de Colombia, rodeada de paisajes exuberantes y llena de calidez. Diseñada para brindar confort y tranquilidad, esta propiedad combina a la perfección un estilo moderno con detalles tradicionales que resaltan la esencia de la cultura colombiana.",
        options: []

    }

  return (
    <div className="p-4">

      {/* Volver a la Home */}
      <BackButton />

      {/* Detalles de la Propiedad */}
      <CardDetail/>

      <div className='flex flex-col lg:flex-row lg:gap-8 lg:mx-12 mb-8'>
      {/* Descripción */}
      <div className='lg:w-1/2'>
        <DescriptionDetail/>
      </div>
      
      {/* Calendario y cantidad de viajeros */}
      <div className='lg:w-1/2'>
        <BookingDetail/>
      </div>

      </div>
      
      {/* Mapa */}
      <Map/>

      <ReviewsContainer/>

    </div>
  );
}

export default ContainerDetail;