import React, { useState } from "react";
import useFetchProperties from "../../hooks/AdminDashboard/useFetchProperties";
import { IPropiedad } from "../../interfaces/properties";
import { FiArrowLeftCircle } from "react-icons/fi";
import Swal from "sweetalert2";

const AllProperties: React.FC = () => {
  const { properties, error, loading } = useFetchProperties();
  const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);

  const handlePropertyClick = (property: IPropiedad) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };
  const handleActivateProperty = async (propertyId: string) => {
    if (!selectedProperty) {
      Swal.fire("Error", "No se ha seleccionado ninguna propiedad", "error");
      return;
    }
  
    console.log("Propiedad antes de actualizar:", selectedProperty);
  
    try {
      const propertyToUpdate = {
        id: selectedProperty.id,
        name: selectedProperty.name,
        price: selectedProperty.price,
        description: selectedProperty.description,
        state: selectedProperty.state,
        city: selectedProperty.city,
        capacity: selectedProperty.capacity,
        bedrooms: selectedProperty.bedrooms,
        bathrooms: selectedProperty.bathrooms,
        hasMinor: selectedProperty.hasMinor,
        pets: selectedProperty.pets,
        isActive: true,  // Aseguramos que estamos activando la propiedad
        wifi: selectedProperty.amenities_?.wifi,
        piscina: selectedProperty.amenities_?.piscina,
        parqueadero: selectedProperty.amenities_?.parqueadero,
        cocina: selectedProperty.amenities_?.cocina,
        tv: selectedProperty.amenities_?.tv,
        airConditioning: selectedProperty.amenities_?.airConditioning,
      };
      console.log("ID de propiedad a actualizar:", selectedProperty.id);
  
      const response = await fetch(`http://localhost:3002/property/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyToUpdate),
      });
  
      console.log("Enviando datos al backend:", propertyToUpdate);
  
      if (!response.ok) {
        const errorResponse = await response.json();
        Swal.fire("Error", errorResponse.message || "Hubo un problema con la activación de la propiedad", "error");
        return;
      }
  
      // Asegúrate de verificar el campo success en la respuesta
      const result = await response.json();
      if (result.success) {
        Swal.fire("Éxito", "Propiedad activada correctamente", "success");
        // Solo actualizamos el estado si la propiedad se activa con éxito
        setSelectedProperty((prev) => ({
          ...prev!,
          isActive: true,
        }));
      } else {
        Swal.fire("Error", "No se pudo activar la propiedad", "error");
      }
    } catch (error) {
      console.error("Error al activar la propiedad:", error);
      Swal.fire("Error", "Hubo un problema al activar la propiedad", "error");
    }
  };
  

  // const handleActivateProperty = async (propertyId: string) => {
  //   if (!selectedProperty) {
  //     Swal.fire("Error", "No se ha seleccionado ninguna propiedad", "error");
  //     return;
  //   }
  
  //   // Aquí puedes hacer un console.log de la propiedad que estás obteniendo antes de enviarla al backend
  //   console.log("Propiedad antes de actualizar:", selectedProperty);
  
  //   try {
  //     const propertyToUpdate = {
  //       id: selectedProperty.id,
  //       title: selectedProperty.title,
  //       price: selectedProperty.price,
  //       description: selectedProperty.description,
  //       state: selectedProperty.state,
  //       city: selectedProperty.city,
  //       capacity: selectedProperty.capacity,
  //       bedrooms: selectedProperty.bedrooms,
  //       bathrooms: selectedProperty.bathrooms,
  //       hasMinor: selectedProperty.hasMinor,
  //       pets: selectedProperty.pets,
  //       isActive: true,  // Aseguramos que estamos activando la propiedad
  //       wifi: selectedProperty.wifi,
  //       piscina: selectedProperty.piscina,
  //       parqueadero: selectedProperty.parqueadero,
  //       cocina: selectedProperty.cocina,
  //       tv: selectedProperty.tv,
  //       airConditioning: selectedProperty.airConditioning,
  //     };
  //     console.log("ID de propiedad a actualizar:", selectedProperty.id);
  
  //     const response = await fetch(`http://localhost:3002/property/update`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(propertyToUpdate), // Mandamos el objeto completo
  //     });
  //     console.log("Enviando datos al backend:", propertyToUpdate);
  
  //     if (!response.ok) {
  //       const errorResponse = await response.json();
  //       Swal.fire("Error", errorResponse.message || "Hubo un problema con la activación de la propiedad", "error");
  //       return;
  //     }
  
  //     const result = await response.json();
  //     if (result.success) {
  //       Swal.fire("Éxito", "Propiedad activada correctamente", "success");
  //       setSelectedProperty((prev) => ({
  //         ...prev!,
  //         isActive: true,
  //       }));
  //     } else {
  //       Swal.fire("Error", "No se pudo activar la propiedad", "error");
  //     }
  //   } catch (error) {
  //     console.error("Error al activar la propiedad:", error);
  //     Swal.fire("Error", "Hubo un problema al activar la propiedad", "error");
  //   }
  // };

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
        <div className="property-detail relative">
    
          <button
            onClick={handleBackToList}
            className="flex items-center text-black-500 hover:text-gray-700 mb-4 absolute top-4 left-4 z-20"
          >
            <FiArrowLeftCircle className="h-5 w-5 mr-2" />
            Volver a la lista de propiedades
          </button>
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            <p className={selectedProperty.isActive ? "text-green-500" : "text-red-500"}>
              {selectedProperty.isActive ? "Activa" : "Pendiente"}
            </p>

            {!selectedProperty.isActive && (
              <button
                onClick={() => handleActivateProperty(selectedProperty.id)}
                className="bg-velvet text-white px-4 py-2 rounded-md"
              >
                Activar propiedad
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-16">
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-2">Fotos:</h4>
              {selectedProperty.image_ && selectedProperty.image_.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedProperty.image_.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Propiedad ${selectedProperty.name} Foto ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              ) : (
                <p>No hay imágenes disponibles para esta propiedad.</p>
              )}
            </div>
            <div className="col-span-1">
              <p className="text-sm text-gray-500">{selectedProperty.description}</p>

              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <p><strong>Precio:</strong> ${selectedProperty.price}</p>
                <p><strong>Estado:</strong> {selectedProperty.state}</p>
                <p><strong>Ciudad:</strong> {selectedProperty.city}</p>
                {/* <p><strong>Dirección:</strong> {selectedProperty.address}</p> */}
                <p><strong>Habitaciones:</strong> {selectedProperty.bedrooms}</p>
                <p><strong>Baños:</strong> {selectedProperty.bathrooms}</p>
                <p><strong>Capacidad:</strong> {selectedProperty.capacity} personas</p>
                <p><strong>Latitud:</strong> {selectedProperty.latitude}</p>
                <p><strong>Longitud:</strong> {selectedProperty.longitude}</p>
                <p><strong>Acepta menores:</strong> {selectedProperty.hasMinor ? "Sí" : "No"}</p>
                <p><strong>Acepta mascotas:</strong> {selectedProperty.pets ? "Sí" : "No"}</p>
                <p><strong>Tipo:</strong> {selectedProperty.type}</p>
                <p><strong>Activo:</strong> {selectedProperty.isActive ? "Sí" : "No"}</p>
                <p><strong>Wifi:</strong> {selectedProperty.amenities_?.wifi ? "Sí" : "No"}</p>
                <p><strong>TV:</strong> {selectedProperty.amenities_?.tv ? "Sí" : "No"}</p>
                <p><strong>Aire acondicionado:</strong> {selectedProperty.amenities_?.airConditioning ? "Sí" : "No"}</p>
                <p><strong>Piscina:</strong> {selectedProperty.amenities_?.piscina ? "Sí" : "No"}</p>
                <p><strong>Parqueadero:</strong> {selectedProperty.amenities_?.parqueadero ? "Sí" : "No"}</p>
                <p><strong>Cocina:</strong> {selectedProperty.amenities_?.cocina ? "Sí" : "No"}</p>
              </div>
            </div>
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
              <h3 className="text-xl font-semibold">{property.name}</h3>
              <p className="text-gray-600">{property.city}</p>
              {property.image_ && property.image_.length > 0 && (
                <img
                  src={property.image_[0].url}
                  alt={`Propiedad ${property.name} Foto 1`}
                  className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                />
              )}
              <p className="font-medium">
                Precio por noche:{" "}
                <span className="text-green-500">${property.price}</span>
              </p>
              <p className="text-sm text-gray-500">
                Capacidad: {property.capacity} personas,{" "}
                {property.bedrooms} Habitaciones, {property.bathrooms} Baño(s)
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProperties;
