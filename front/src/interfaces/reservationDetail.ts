import { IReserva } from "./reservation";
export interface IReservationDetail {
    userId: any;
    id: string;
    reservation: IReserva;
    checkIn: string;
    checkOut: string;
    pax: number;
    property: string; 
  }
  