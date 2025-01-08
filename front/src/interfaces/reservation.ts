export interface IReserva {
  id: string;
  property: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  state: string;
  imageUrl: string;
}

export interface Reserv {
  propertyId: string;
  dates: {
    startDate: string;
    endDate: string;
  };
  prices: {
    totalPrecioNights: number;
    servicio: number;
    totalPrice: number;
    price: number;
    limpieza: number; // Agregamos la propiedad para el servicio de limpieza
  };
  travelers: {
    adults: number;
    children: number;
    babies: number;
  };
}