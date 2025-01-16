import React from "react";

interface ReservationCardProps {
  reservation: {
    startDate: string;
    endDate: string;
    guests: number;
    status: string;
    property_: {
      name: string;
      image_: { url: string }[];
    };
  };
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  const { startDate, endDate, guests, status, property_ } = reservation;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={property_.image_[0]?.url}
        alt={property_.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold">{property_.name}</h2>
      <p className="text-gray-600">Check-in: {new Date(startDate).toLocaleDateString()}</p>
      <p className="text-gray-600">Check-out: {new Date(endDate).toLocaleDateString()}</p>
      <p className="text-gray-600">Huéspedes: {guests}</p>
      <p
        className={`font-semibold ${
          status === "confirmada"
            ? "text-green-500"
            : status === "negociacion"
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        Estado: {status}
      </p>
    </div>
  );
};

export default ReservationCard;
