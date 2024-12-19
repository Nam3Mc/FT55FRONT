export interface IRegisterUser {
  name: string;
  lastName: string;
  email: string;
  phone: number;
  nationality: string;
  dni: number;
  userName: string;
  password: string;
  confirmPassword: string;
}
export interface IUserSession {
  token: string;
  user: {
    id: string;
    email: string;
    isActive: boolean;
    roles: string;
  };
}
