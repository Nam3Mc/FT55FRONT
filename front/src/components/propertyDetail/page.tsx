import React from "react";
import { IPropiedad } from "@/interfaces/properties";

interface PropertyDetailProps {
  property: IPropiedad;
  onClose: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose }) => {
  return (
    <div className="mt-8 p-6 border border-gray-300 rounded-md shadow-md">
      <h3 className="text-2xl font-bold">{property.title}</h3>
      <img
        src={property.photos[0]}
        alt={property.title}
        className="w-full h-64 object-cover rounded-md mt-4"
      />
      <p className="mt-4">{property.description}</p>
      <p className="mt-2 font-semibold">
        Precio por noche: $
        {property.price?.[0] !== undefined ? property.price[0] : "No disponible"}
      </p>
      <p className="text-gray-600">
        Capacidad: {property.capacity} personas,{" "}
        {property.bedrooms?.[0]} habitaciones, {property.bathrooms} baño(s)
      </p>
      <button
        onClick={onClose}
        className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Cerrar
      </button>
    </div>
  );
};

export default PropertyDetail;
