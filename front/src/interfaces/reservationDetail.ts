import { IAccount } from "./IAccount";

export interface IReservationDetail {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  guests: number;
  pet: boolean;
  minor: boolean;
  account_: IAccount;  // Aquí agregamos la propiedad 'account_' con el tipo IAccount
}