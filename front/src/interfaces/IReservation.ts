export interface IReservation {
    startDate: string;
    endDate: string;
    guests: number;
    pet: boolean;
    minor: boolean;
    accountId: string;
    propertyId: string;
    paypalEmail: string
}