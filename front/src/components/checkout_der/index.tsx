import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface DerProps {
  prices: {
    totalPrecioNights: number;
    servicio: number;
    total: number;
    price: number
  };
  photo: string | StaticImageData;
  name: string;
  type: string;
  rating: number;
  nights: number;
  state: string;
  city: string
}



export const CheckoutDer: React.FC<DerProps> = (DerProps) => {

    const {prices, photo, name, type, rating, nights, state, city } = DerProps

    return (
        <div className="flex flex-col h-full w-full">
            
            {/* Imagen */}
            <div className="mb-4">
                <Image
                src={photo}
                alt={name}
                width={300}
                height={200}
                className="rounded-lg"
                />
            </div>

            {/* Título y tipo */}
            <h3 className="text-lg font-bold mb-2">{name}</h3>
            <h3 className="text-sm font-semibold mb-2">{state} • {city}</h3>
            <p className="text-sm mb-4">
                {type} • ⭐ {rating.toFixed(2)}
            </p>
                
            <hr className="border-marble mb-4" />

            {/* Detalles del precio */}
            <div className="flex justify-between mb-2">
                <span>${prices.price.toFixed(2)} USD por {nights} noches</span>
                <span className="font-semibold">
                    ${prices.totalPrecioNights.toFixed(2)} USD
                </span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Servicio de RentaFacil</span>
                <span className="font-semibold">${prices.servicio.toFixed(2)} USD</span>
            </div>

            <hr className="border-marble my-4" />

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold mb-4">
                <span>Total (USD)</span>
                <span className="font-semibold">${prices.total.toFixed(2)} USD</span>
            </div>
        </div>
    )
}

export default CheckoutDer;
