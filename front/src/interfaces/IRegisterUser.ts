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
    name: string;
    lastName: string;
    email: string;
    nationality: string;
    userName: string;
    phone: number;
    role: string;
  };
}
