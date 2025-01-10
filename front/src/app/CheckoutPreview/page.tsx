/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
// react
import { useState, useEffect } from "react";

// next
import { useRouter } from "next/navigation";

// components
import CheckoutIzq from "../../components/checkout_izq";
import CheckoutDer from "@/components/checkout_der";

// interfaces
import { IProperty } from "@/interfaces/IProperty";
import { ILocalReservation } from "@/interfaces/IReservation";

// API peticiones
import { getPropertyById } from "@/api/PropertyAPI";
import { createReservation, getEmailOwner } from "@/api/ResevationAPI";
import { getUserAccount } from "@/api/UsersAPI";

// Sweet
import Swal from "sweetalert2";

// img
import casadef from "@/assets/casadef.png";

const CheckoutPreview = () => {
  const router = useRouter(); // Hook para manejar la navegación
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const houseDef = casadef
  const [reservData, setReservData] = useState<ILocalReservation | null>(null);
  const [propertyData, setPropertyData] = useState<IProperty | null>(null);
  const [accountData, setAccountData] = useState<string>("")
  const [paypalEmail, setPaypalEmail] = useState<string>("");

  useEffect(()=> {
    
    const reservLocal = localStorage.getItem('reserv');
    // Recuperar datos del Local
    const userLocal = localStorage.getItem('user')
    if (userLocal) {
      const user = JSON.parse(userLocal)
      getUserAccount(user.id)
      .then((account) => {
        setAccountData(account.id)
      })
    }
    if (reservLocal) {
      const reserv: ILocalReservation = JSON.parse(reservLocal);
      setReservData(reserv)
      
      // peticion para traerme el email del propietario
      getEmailOwner(reserv.propertyId)
      .then((email: string) => {
        setPaypalEmail(email);
      })
      .catch((error) => console.error("Error fetching owner email:", error));

      // Obtener información de la propiedad desde el backend
          getPropertyById(reserv.propertyId)
          .then((property) => {
              setPropertyData(property);
              })
          .catch((error) => console.error('Error fetching property:', error));
          }
        }, []);

        if (!reservData || !propertyData) {
          return <p>Cargando información del viaje...</p>;
      }

      console.log(reservData);
      
      const { dates, prices, travelers, propertyId} = reservData;
      const {name, type, rating, image_, state, city } = propertyData;
      console.log(image_);

      const photo = image_? image_[0].url : houseDef;
  
      const nights = Math.ceil(
        (new Date(dates.endDate).getTime() - new Date(dates.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
          );

      const minor = travelers.children || travelers.babies? true : false

      const reserva = {
        startDate: dates.startDate,
        endDate: dates.endDate,
        guests: travelers.adults + travelers.children,
        pets: travelers.pets,
        minor,
        propertyId,
        accountId: accountData,
        paypalEmail,
      }

      console.log(`esta es la reserva:`,reserva);
          
  
  const handlePayment = async () => {
    setLoading(true); // Activa el estado de carga
    try {
      const response = await createReservation(reserva);
  
      if (response && response.link) {
        // Redirigir al usuario al enlace proporcionado por el backends
        localStorage.setItem("contract_id", JSON.stringify(response.id));
        window.location.href = response.link;
      } else {
        console.error("No se recibió un enlace válido en la respuesta:", response);
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "No pudimos redirigirte al pago. Intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Ocurrió un error inesperado. Intenta nuevamente.",
      });
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-6 bg-silk text-black">
    <CheckoutIzq dates={dates} travelers={travelers}/>
    <div className="w-full md:w-1/3 bg-pearl p-6 rounded-lg shadow-lg flex flex-col justify-between">
      <div>
        <CheckoutDer prices={prices} name={name} type={type} rating={rating} photo={photo} nights={nights} state={state} city={city}/>
      </div>
      <button
        onClick={handlePayment}
        className="w-full py-3 bg-champagne text-pearl font-bold rounded-lg hover:bg-velvet hover:text-champagne transition"
        disabled={loading}
      >
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </div>
  </div>
  );
};

export default CheckoutPreview;
