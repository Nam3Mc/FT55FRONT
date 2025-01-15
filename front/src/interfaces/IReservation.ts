export interface IReservation {
    startDate: string;
     endDate: string;
     guests: number;
     pets: boolean;
     minor: boolean;
     accountId: string;
     propertyId: string;
     paypalEmail: string
}

export interface ILocalReservation {
     propertyId: string;
     dates: {
       startDate: string;
       endDate: string;
     };
     prices: {
       totalPrecioNights: number;
       servicio: number;
       total: number;
       price: number
     };
     travelers: {
       adults: number;
       children: number;
       babies: number;
       pets:boolean
     };
}

export interface IContractReservation {
  status: string;
  id: string;
  startDate: string;
  endDate: string;
  guests: number;
  pet: boolean;
  minor: boolean
}