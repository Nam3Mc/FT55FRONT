import React, { useEffect, useState } from "react";
import { IReservationDetail } from "../../interfaces/reservationDetail";

const AllReservations: React.FC = () => {
  const [reservations, setReservations] = useState<IReservationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/reservations/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener reservas");
        }
        return response.json();
      })
      .then((data) => {
        setReservations(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener reservas:", error);
        setError("Error al obtener reservas");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Todas las Reservas</h2>
      <ul className="space-y-4">
        {reservations.map((reservationDetail) => (
          <li
            key={reservationDetail.id}
            className="flex items-center p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {reservationDetail.property}
              </h3>
              <p className="text-gray-600">
                Fecha de entrada:{" "}
                <span className="text-blue-500">
                  {reservationDetail.checkIn}
                </span>
              </p>
              <p className="text-gray-600">
                Fecha de salida:{" "}
                <span className="text-blue-500">
                  {reservationDetail.checkOut}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Huéspedes: {reservationDetail.pax}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllReservations;

