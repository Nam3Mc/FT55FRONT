import { useState, useEffect } from "react";
import { IReservationDetail } from "../../interfaces/reservationDetail";

const useReservations = () => {
  const [reservations, setReservations] = useState<IReservationDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:3002/reservations/");
        if (!response.ok) {
          throw new Error("Error al obtener reservas");
        }
        const data = await response.json();
        setReservations(data);
      } catch (err: any) {
        setError(err.message || "Error al obtener reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservations, loading, error };
};

export default useReservations;
