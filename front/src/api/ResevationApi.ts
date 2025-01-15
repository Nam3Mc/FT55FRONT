import Swal from "sweetalert2";
import { IContractReservation, IReservation } from "@/interfaces/IReservation";


const API_URL = process.env.NEXT_PUBLIC_API_URL

export const createReservation = async (reservation: IReservation) => {
   
    try {
        const res = await fetch(`${API_URL}/payments`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(reservation)
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

export const getEmailOwner = async(propertyId:string): Promise<string> => {
    try {
        const res = await fetch(`${API_URL}/property/email/${propertyId}`, {
            next: { revalidate: 1200}
        });
        
        if (!res.ok) {
            throw new Error(`Fallo al realizar el fetch a Email: ${res.status} ${res.statusText}`);
        }
        const paypalEmail: string = await res.text();
        console.log(paypalEmail);
        
        return paypalEmail;
    } catch (error: any) {
        console.error("Error in getEmailOwner:", error.message || error);
        throw new Error(error)
    }

}

export const getReservationDaysById = async ( propertyId: string ): Promise<Date[]> => {
    try {
      const res = await fetch(`${API_URL}/contract/propety/${propertyId}`, {
        next: { revalidate: 1200 },
      });
  
      if (!res.ok) {
        throw new Error(`Error fetching reservations: ${res.status}`);
      }
  
      const reservations: IContractReservation[] = await res.json();
  
      const blockedDates: Date[] = [];
      reservations.forEach((reservation) => {
        if (reservation.status !== "cancelled") {
          const start = new Date(reservation.startDate);
          const end = new Date(reservation.endDate);
  
          for (
            let date = new Date(start);
            date <= end;
            date.setDate(date.getDate() + 1)
          ) {
            blockedDates.push(new Date(date)); 
          }
        }
      });
  
      return blockedDates;
    } catch (error: any) {
      console.error("Error in getReservationDaysById:", error.message || error);
      return [];
    }
  };

  interface IBackPaid {
    url: string,
    contractId: string 
  }

  export const PaidReservation = async (reservation: IBackPaid | void) => {
    try {
      const res = await fetch(`${API_URL}/payments/paid`, {
          method: "POST",
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify(reservation)
      })

      if(res.ok) {
          return res.json()
      } else {
          const errorDetails = await res.text(); 
          console.error("Error details:", errorDetails);
          Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "No pudimos realizar el pago de tu reserva",
          });
      }

  } catch (error: any) {
      Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "No pudimos realizar el pago de tu reserva",
      });
      throw new Error(error)
  }
  }