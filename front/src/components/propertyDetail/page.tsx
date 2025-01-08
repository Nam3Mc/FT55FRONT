import React from "react";
import { IPropiedad } from "@/interfaces/properties";

interface PropertyDetailProps {
  property: IPropiedad;
  onClose: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose }) => {
  return (
    <div className="mt-8 p-6 border border-gray-300 rounded-md shadow-md max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">{property.name}</h3>
      <div className="mb-4">
      {property.image_ && property.image_.length > 0 ? (
          <img
            src={property.image_?.[0]?.url || "/path/to/default-image.jpg"}
            alt={property.name}
            className="w-full h-64 object-cover rounded-md"
          />
        ) : (
          <img
            src="/path/to/default-image.jpg"
            alt="Default"
            className="w-full h-64 object-cover rounded-md"
          />
        )}
      </div>
      <p className="mt-4 text-lg">{property.description}</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <p className="font-semibold">Precio por noche: ${property.price}</p>
        <p className="font-semibold">Capacidad: {property.capacity} personas</p>
        <p className="font-semibold">Ubicación: {property.city}, {property.state}</p>
        <p className="font-semibold">Habitaciones: {property.bedrooms}</p>
        <p className="font-semibold">Baños: {property.bathrooms}</p>
        <p className="font-semibold">Calificación: {property.rating}⭐</p>
        <p className="font-semibold">Apto para mascotas: {property.pets ? "Sí" : "No"}</p>
        <p className="font-semibold">Menores permitidos: {property.hasMinor ? "Sí" : "No"}</p>
      </div>
      <div className="mt-4">
        <h4 className="text-xl font-semibold mb-2">Comodidades</h4>
        <ul className="list-disc pl-5">
          {property.amenities_?.wifi && <li>Wi-Fi</li>}
          {property.amenities_?.tv && <li>TV</li>}
          {property.amenities_?.airConditioning && <li>Aire acondicionado</li>}
          {property.amenities_?.piscina && <li>Piscina</li>}
          {property.amenities_?.parqueadero && <li>Parqueadero</li>}
          {property.amenities_?.cocina && <li>Cocina</li>}
        </ul>
      </div>
      <button
        onClick={onClose}
        className="mt-6 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 w-full sm:w-auto"
      >
        Cerrar
      </button>
    </div>
  );
};

export default PropertyDetail;
