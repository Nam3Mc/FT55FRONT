import { useState, useEffect } from "react";
import { IReservationDetail } from "../../interfaces/reservationDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useReservations = (userId: string) => {
  const [reservations, setReservations] = useState<IReservationDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const response = await fetch(`${API_URL}/contract/user/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener las reservas del usuario");
        }
        const data = await response.json();
        setReservations(data);
      } catch (err: any) {
        setError(err.message || "Error al obtener las reservas del usuario");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserReservations();
    }
  }, [userId]);

  return { reservations, loading, error };
};

export default useReservations;
