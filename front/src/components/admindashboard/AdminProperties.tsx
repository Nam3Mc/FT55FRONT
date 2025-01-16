import React, { useState, useEffect } from "react";
import useFetchProperties from "../../hooks/AdminDashboard/useFetchProperties";
import { IPropiedad } from "../../interfaces/properties";
import { FiArrowLeftCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import { PropertyStatus } from "@/helpers/statusProperty";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AllProperties: React.FC = () => {
  const { properties: fetchedProperties,  error, loading } = useFetchProperties();
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    if (fetchedProperties) {
      setProperties(fetchedProperties);
    }
  }, [fetchedProperties]);

  const handlePropertyClick = (property: IPropiedad) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };
    
  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
  };

  type PropertyStatus = keyof typeof PropertyStatus;  

  const handleChangePropertyStatus = async (
    propertyId: string,
    currentStatus: typeof PropertyStatus[keyof typeof PropertyStatus],
    action: string
  ) => {
    let newStatus: typeof PropertyStatus[keyof typeof PropertyStatus];
    let statusMessage = "";
  
    if (currentStatus === PropertyStatus.ACTIVATED) {
      newStatus = PropertyStatus.INACTIVE;
      statusMessage = "inactiva";
    } else if (currentStatus === PropertyStatus.INACTIVE) {
      newStatus = PropertyStatus.ACTIVATED;
      statusMessage = "activada";
    } else if (currentStatus === PropertyStatus.PENDING) {
      newStatus = PropertyStatus.ACTIVATED;
      statusMessage = "aprobada";
    } else {
      throw new Error("Estado de propiedad desconocido");
    }
  
    try {
<<<<<<< HEAD
      const propertyToUpdate = {
        id: selectedProperty.id,
        name: selectedProperty.title,
        price: selectedProperty.price,
        description: selectedProperty.description,
        state: selectedProperty.state,
        city: selectedProperty.city,
        capacity: selectedProperty.capacity,
        bedrooms: selectedProperty.bedrooms,
        bathrooms: selectedProperty.bathrooms,
        hasMinor: selectedProperty.hasMinor,
        pets: selectedProperty.pets,
        isActive: true,
        wifi: selectedProperty.amenities_?.wifi,
        piscina: selectedProperty.amenities_?.piscina,
        parqueadero: selectedProperty.amenities_?.parqueadero,
        cocina: selectedProperty.amenities_?.cocina,
        tv: selectedProperty.amenities_?.tv,
        airConditioning: selectedProperty.amenities_?.airConditioning,
      };
      console.log("ID de propiedad a actualizar:", selectedProperty.id);
  
      const response = await fetch(`https://rentafacil.onrender.com/property/update`, {
        method: 'PUT',
=======
      const response = await fetch(`${API_URL}/property/status`, {
        method: "PUT",
>>>>>>> 31c41c1a7b3d020d19d4d22d35bdb67e1fe7cd04
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: propertyId }),
      });
  
      const data = await response.json();
      
  
      if (response.ok) {
        Swal.fire("Éxito", `La propiedad se pudo ${action} correctamente.`, "success");

        setSelectedProperty((prev) =>
          prev?.id === propertyId ? { ...prev, isActive: newStatus } : prev
        );
  
        const updatedProperties = properties.map((prop) =>
          prop.id === propertyId ? { ...prop, isActive: newStatus } : prop
        );
        setProperties(updatedProperties); 
      } else {
        Swal.fire("Error", data.message || "Hubo un error al cambiar el estado de la propiedad", "error");
      }
    } catch (error) {
      console.error("Error al cambiar el estado de la propiedad", error);
      Swal.fire("Error", "Hubo un error de comunicación con el servidor", "error");
    }
  };
  
  

  const filteredProperties = filterStatus
  ? properties.filter((property) => property.isActive === filterStatus)
  : properties;

  const getNoPropertiesMessage = () => {
    switch (filterStatus) {
      case PropertyStatus.ACTIVATED:
        return "No hay propiedades activas para mostrar en este momento.";
      case PropertyStatus.INACTIVE:
        return "No hay propiedades inactivas para mostrar en este momento.";
      case PropertyStatus.PENDING:
        return "No hay propiedades pendientes para mostrar en este momento.";
      default:
        return "No hay propiedades para mostrar en este momento.";
    }
  };

  if (loading) {
    return <p>Cargando propiedades...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
     <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Propiedades</h2>
      <select
        value={filterStatus || ""}
        onChange={(e) => handleFilterChange(e.target.value || null)}
        disabled={!!selectedProperty}
        className={`border border-gray-300 rounded-md px-4 py-2 ${
          selectedProperty ? "cursor-not-allowed bg-gray-200 text-gray-500" : ""
        }`}
        title={selectedProperty ? "El filtro está deshabilitado en el detalle de la propiedad" : ""}
      >
        <option value="">Todos</option>
        <option value={PropertyStatus.ACTIVATED}>Activa</option>
        <option value={PropertyStatus.INACTIVE}>Inactiva</option>
        <option value={PropertyStatus.PENDING}>Pendiente</option>
      </select>
    </div>  
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
            <p className={selectedProperty.isActive === PropertyStatus.ACTIVATED ? "text-green-500" : "text-red-500"}>
              {selectedProperty.isActive === PropertyStatus.ACTIVATED
                ? "Activa"
                : selectedProperty.isActive === PropertyStatus.INACTIVE
                ? "Inactiva"
                : "Pendiente"}
            </p>
            <div>
              {selectedProperty.isActive === PropertyStatus.ACTIVATED ? (
                <button
                  onClick={() => handleChangePropertyStatus(selectedProperty.id, PropertyStatus.ACTIVATED, "Desactivar")}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Desactivar
                </button>
              ) : selectedProperty.isActive === PropertyStatus.INACTIVE ? (
                <button
                  onClick={() => handleChangePropertyStatus(selectedProperty.id, PropertyStatus.INACTIVE, "Activar")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Activar
                </button>
              ) : (
                <button
                  onClick={() => handleChangePropertyStatus(selectedProperty.id, PropertyStatus.PENDING, "Aprobar")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Aprobar
                </button>
              )}
            </div>
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
      ) : filteredProperties.length > 0 ? (
        <ul className="space-y-4">
          {filteredProperties.map((property) => (
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
      ) : (
        <p className="text-gray-500 text-center">{getNoPropertiesMessage()}</p>
      )}
    </div>
  );
};
  
export default AllProperties;