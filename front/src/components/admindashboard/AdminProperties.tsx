import React, { useState } from "react";
import useFetchProperties from "../../hooks/AdminDashboard/useFetchProperties";
import { IPropiedad } from "../../interfaces/properties";
import { FiArrowLeftCircle } from "react-icons/fi";

const AllProperties: React.FC = () => {
  const { properties, error, loading } = useFetchProperties();
  const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(
    null
  );

  const handlePropertyClick = (property: IPropiedad) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };

  if (loading) {
    return <p>Cargando propiedades...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Propiedades</h2>

      {selectedProperty ? (
        <div className="property-detail">
          <button
            onClick={handleBackToList}
            className="flex items-center text-black-500 hover:text-gray-700 mb-4"
          >
            <FiArrowLeftCircle className="h-5 w-5 mr-2" />
            Volver a la lista de propiedades
          </button>
          <h3 className="text-xl font-semibold">{selectedProperty.title}</h3>
          <p className="text-gray-600">{selectedProperty.city}</p>
          <p className="text-gray-600">
            {selectedProperty.owner.name} {selectedProperty.owner.lastName}
          </p>
          <p className="font-medium">
            Precio por noche:{" "}
            <span className="text-green-500">
              ${selectedProperty?.price?.[0]}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Capacidad: {selectedProperty.capacity} personas,{" "}
            {selectedProperty?.bedrooms?.[0]} Habitaciones,{" "}
            {selectedProperty.bathrooms} baño(s)
          </p>
          <p className="text-sm text-gray-500">
            {selectedProperty.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {selectedProperty.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Propiedad ${selectedProperty.title} Foto ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {properties.map((property) => (
            <li
              key={property.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
              onClick={() => handlePropertyClick(property)}
            >
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.city}</p>
              <p className="font-medium">
                Precio por noche:{" "}
                <span className="text-green-500">${property?.price?.[0]}</span>
              </p>
              <p className="text-sm text-gray-500">
                Capacidad: {property.capacity} personas,{" "}
                {property?.bedrooms?.[0]} Habitaciones, {property.bathrooms}{" "}
                Baño(s)
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProperties;
