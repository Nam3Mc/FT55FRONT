import { user } from "@/helpers/data";


export interface IAccount {
        id: string;
        password:string;
        role: string
}

export interface IAccountUser {
        id: string;
        password:string;
        role: string;
        user_: user
}