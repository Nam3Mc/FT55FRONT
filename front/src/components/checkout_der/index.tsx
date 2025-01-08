import React, { useEffect, useState } from "react";
import Image from "next/image";
import casadef from "@/assets/casadef.png";
import { getPropertyById } from "@/api/PropertyAPI";
import { IProperty } from "@/interfaces/IProperty";
import { Reserv } from "@/interfaces/reservation";

export const CheckoutDer: React.FC = () => {
  const houseDef = casadef;
  const [reservData, setReservData] = useState<Reserv | null>(null);
  const [propertyData, setPropertyData] = useState<IProperty | null>(null);

  useEffect(() => {
    const reservLocal = localStorage.getItem("reserv");
    if (reservLocal) {
      const reserv: Reserv = JSON.parse(reservLocal);
      setReservData(reserv);

      getPropertyById(reserv.propertyId)
        .then((property) => {
          setPropertyData(property);
        })
        .catch((error) => console.error("Error fetching property:", error));
    }
  }, []);

  if (!reservData || !propertyData) {
    return <p>Cargando información del viaje...</p>;
  }

  console.log(reservData);

  const { dates, prices } = reservData;
  const { name, type, rating, photos } = propertyData;
  const photo = photos ? photos[0] : houseDef;

  const nights = Math.ceil(
    (new Date(dates.endDate).getTime() - new Date(dates.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex flex-col h-full w-full">
      {/* Imagen */}
      <div className="mb-4">
        <Image
          src={photo}
          alt={name}
          width={300}
          height={200}
          className="rounded-lg"
        />
      </div>

      {/* Título y tipo */}
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <p className="text-sm mb-4">
        {type} • ⭐ {rating.toFixed(2)}
      </p>

      <hr className="border-marble mb-4" />

      {/* Detalles del precio */}
      <div className="flex justify-between mb-2">
        <span>
          ${prices?.totalPrecioNights?.toFixed(2) ?? "N/A"} USD por {nights}{" "}
          noches
        </span>
        <span className="font-semibold">
          ${prices?.totalPrecioNights?.toFixed(2) ?? "N/A"} USD
        </span>
      </div>

      {/* Servicio de Limpieza */}
      <div className="flex justify-between mb-2">
        <span>Servicio de Limpieza</span>
        <span className="font-semibold">
          ${prices?.limpieza?.toFixed(2) ?? "N/A"} USD
        </span>
      </div>

      {/* Servicio de RentaFacil */}
      <div className="flex justify-between mb-2">
        <span>Servicio de RentaFacil</span>
        <span className="font-semibold">
          ${prices?.servicio?.toFixed(2) ?? "N/A"} USD
        </span>
      </div>

      <hr className="border-marble my-4" />

      {/* Total */}
      <div className="flex justify-between items-center text-lg font-bold mb-4">
        <span>Total (USD)</span>
        <span className="font-semibold">
          ${prices?.totalPrice?.toFixed(2) ?? "N/A"} USD
        </span>
      </div>
    </div>
  );
};

export default CheckoutDer;
