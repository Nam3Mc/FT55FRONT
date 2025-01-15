import Swal from "sweetalert2";
import { IReservation } from "@/interfaces/IReservation";


const API_URL = process.env.NEXT_PUBLIC_API_URL

export const createReservation = async (reservation: IReservation) => {
   
    try {
        const res = await fetch(`${API_URL}/payments`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({reservation})
        })

        if(res.ok) {
            return res.json()
        } else {
            const errorDetails = await res.text(); 
            console.error("Error details:", errorDetails);
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "No pudimos realizar tu reserva",
            });
        }

    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "No pudimos realizar tu reserva",
        });
        throw new Error(error)
    }
}; 