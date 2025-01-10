const API_URL = process.env.NEXT_PUBLIC_API_URL

import { IAccount } from "@/interfaces/IAccount";

export const getUserAccount = async(id: string): Promise<IAccount> => {
    try {
        const res = await fetch(`${API_URL}/users/${id}`, {
            next: { revalidate: 1200}
        });

        if (!res.ok) {
            throw new Error(`Fallo al realizar el fetch a Users por ID: ${res.status} ${res.statusText}`);
        };

        const user = await res.json();
        const account = user.account_
        return account

    } catch (error: any) {
        console.error("Error in getUserAccount:", error.message || error);
        throw new Error(error)
    }

}