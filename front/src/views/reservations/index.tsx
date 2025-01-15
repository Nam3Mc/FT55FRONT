"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BackProfile from "@/components/back_button/backProfile";
import { getUserReservation } from "@/api/ContractsAPI";
import { PaidReservation } from "@/api/ResevationApi";
import ReservationCard from "@/components/card_reservation";
import EmptyReservations from "@/components/empty_reservations";

export const Reservations: React.FC = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser);

          // Verificar y procesar compra pendiente
          const compraId = localStorage.getItem("compraId");
          if (compraId) {
            const currentUrl = window.location.href;
            const paid = {
              url: currentUrl,
              contractId: compraId,
            };

            try {
              const paidResponse = await PaidReservation(paid);
              console.log("Reserva pagada con éxito:", paidResponse);

              Swal.fire({
                icon: "success",
                title: "Reserva realizada",
                text: "¡Tu reserva se realizó correctamente! Gracias por confiar en nosotros.",
              }).then(() => {
                localStorage.removeItem("compraId");
              });
            } catch (error) {
              console.error("Error al procesar la reserva:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al realizar la reserva. Por favor, inténtalo nuevamente.",
              });
            }
          }

          // Obtener reservas del usuario
          const data = await getUserReservation(parsedUser.id);
          setReservations(data);
          console.log(data)
        } else {
          Swal.fire({
            icon: "error",
            title: "Usuario no autenticado",
            text: "Por favor, inicia sesión para ver tus reservas.",
          });
        }
      } catch (error) {
        console.error("Error al cargar las reservas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cargar las reservas. Por favor, inténtalo nuevamente.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Cargando reservas...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <BackProfile />
      <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>
      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      ) : (
        <EmptyReservations />
      )}
    </div>
  );
};

export default Reservations;
