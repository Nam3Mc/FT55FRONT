export default interface IUser {
    reservations(reservations: any): unknown;
    name: string;
    lastName: string;
    birthdate: string;
    phone: string;
    email: string;
    id: string;
    profileImgUrl: string;
    registeredAt: string;
    active: boolean;
    nationality: string;
    dni: string;
    DOB: string;
  }