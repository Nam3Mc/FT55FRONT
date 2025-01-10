import React from 'react';

interface IzqProps {
    dates: {
      startDate: string;
      endDate: string;
    };
    travelers: {
      adults: number;
      children: number;
      babies: number;
      pets: boolean
    };
  }

export const CheckoutIzq: React.FC<IzqProps> = (IzqProps) => {

    const {dates, travelers} = IzqProps
  // Formatear las fechas
  const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  };

  const formattedStartDate = formatDate(dates.startDate);
  const formattedEndDate = formatDate(dates.endDate);

  return (
    <div className="flex-1 pr-6">
      {/* Tarjeta de información del viaje */}
      <div className="bg-pearl p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Tu viaje</h2>
        
        {/* Fechas */}
        <div className="flex justify-between mb-4">
          <span className="text-xl font-semibold underline">Fecha</span>
        </div>
        <p className="mb-4 text-lg">
          Desde {formattedStartDate} hasta {formattedEndDate}
        </p>

        {/* Huéspedes */}
        <div className="flex justify-between mb-4">
          <span className="text-xl font-semibold underline">Huéspedes</span>
        </div>
        <p className="text-lg">
          {travelers.adults} adulto
          {travelers.children > 0 && `, ${travelers.children} niño`}
          {travelers.babies > 0 && `, ${travelers.babies} bebé`}
        </p>
        <p>
          {travelers.pets && `Viajas con mascotas`}
        </p>
      </div>
    </div>
  );
};

export default CheckoutIzq;




      