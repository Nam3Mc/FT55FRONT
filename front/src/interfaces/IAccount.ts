import { user } from "@/helpers/data";
import IUser from "./user";

export interface IAccount {
  id: string;
  password: string;
  role: string;
  user_: IUser;
}

export interface IAccountUser {
  id: string;
  password: string;
  role: string;
  user_: user;
}
