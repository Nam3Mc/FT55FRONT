import React, { useEffect, useState } from "react";
import { IPropiedad } from "@/interfaces/properties";
import PropertyForm from "@/components/propertyForm/page";
import PropertyEditForm from "@/components/propertyEditForm/page";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MyPropertiesProps {}

const MyProperties: React.FC<MyPropertiesProps> = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState<IPropiedad | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        const userId = parsedUser.id;
        if (!userId) {
          throw new Error("El usuario en localStorage no tiene un 'id'.");
        }
 
<<<<<<< HEAD
        fetch(`https://rentafacil.onrender.com/users/${userId}`)
=======
        fetch(`${API_URL}/users/${userId}`)
>>>>>>> 31c41c1a7b3d020d19d4d22d35bdb67e1fe7cd04
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener información del usuario");
            }
            return response.json();
          })
          .then((userData) => {
            const accountId = userData.account_?.id;
            if (!accountId) {
              throw new Error("El usuario no tiene una cuenta asociada (account_).");
            }

<<<<<<< HEAD
            return fetch(`https://rentafacil.onrender.com/property/owner/${accountId}`);
=======
            return fetch(`${API_URL}/property/owner/${accountId}`);
>>>>>>> 31c41c1a7b3d020d19d4d22d35bdb67e1fe7cd04
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al obtener propiedades");
            }
            return response.json();
          })
          .then((properties) => {
            setProperties(properties);
          })
          .catch((error) => console.error("Error en el flujo de datos:", error));
      } catch (error:any) {
        console.error("Error al procesar el usuario:", error.message);
      }
    }
  }, []);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setEditingProperty(null);
  };

  const handleEditClick = (property: IPropiedad) => {
    setEditingProperty(property);
  };

  const handlePropertyClick = (property: IPropiedad) => {
    setSelectedProperty(property);
  };

  const closeDetails = () => {
    setSelectedProperty(null);
  };

  const handleStatusChange = async (property: IPropiedad) => {
    try {
      const response = await fetch(`${API_URL}/property/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: property.id }), 
      });

      const updatedProperty = await response.json();

      if (response.ok) {
        Swal.fire("Éxito", `La propiedad ha sido ${property.isActive === "inactiva" ? "activada" : "desactivada"} correctamente.`, "success");

        setProperties((prev) =>
          prev.map((prop) =>
            prop.id === property.id
              ? { ...prop, isActive: updatedProperty.isActive }
              : prop
          )
        );

        setSelectedProperty((prev) =>
          prev?.id === property.id
            ? { ...prev, isActive: updatedProperty.isActive }
            : prev
        );
      } else {
        Swal.fire("Error", "Hubo un problema al cambiar el estado de la propiedad", "error");
      }
    } catch (error) {
      console.error("Error al cambiar el estado de la propiedad", error);
      Swal.fire("Error", "Hubo un error de comunicación con el servidor", "error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>

      {editingProperty ? (
        <PropertyEditForm property={editingProperty} />
      ) : (
        <>
          {properties.length === 0 ? (
            <p className="text-center text-xl font-medium p-6">
              No tienes propiedades aún, crea una.
            </p>
          ) : selectedProperty ? (
            <div className="p-4 border border-gray-200 rounded-md shadow-md">
              <button
                onClick={closeDetails}
                className="mb-4 p-2 text-black rounded-lg hover:underline"
              >
                Volver a la lista
              </button>
              <img
                src={
                  selectedProperty.image_ && selectedProperty.image_.length > 0
                    ? selectedProperty.image_[0].url
                    : "/placeholder-image.png"
                }
                alt={`Imagen de ${selectedProperty.name}`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold">{selectedProperty.name}</h3>
              <p>{selectedProperty.description}</p>
              <p className="text-gray-600">
                Ubicación: {selectedProperty.city}, {selectedProperty.state}
              </p>
              <p className="font-medium">
                Precio por noche:{" "}
                <span className="text-green-500">
                  ${selectedProperty.price}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Capacidad: {selectedProperty.capacity} personas,{" "}
                {selectedProperty.bedrooms} habitaciones,{" "}
                {selectedProperty.bathrooms} baño(s)
              </p>
              
              <button
                onClick={() => handleStatusChange(selectedProperty)}
                className={`mt-4 px-6 py-2 rounded-md text-white ${
                  selectedProperty.isActive === "inactiva"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {selectedProperty.isActive === "inactiva"
                  ? "Activar Publicación"
                  : "Pausar Publicación"}
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {properties.map((property) => {
                const imageUrl =
                  property.image_ && property.image_.length > 0
                    ? property.image_[0].url
                    : "/placeholder-image.png";

                return (
                  <li
                    key={property.id}
                    className="relative p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 cursor-pointer"
                    onClick={() => handlePropertyClick(property)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(property);
                      }}
                      className="absolute top-2 right-2 p-2 bg-champagne text-black rounded-full hover:bg-yellow-600 flex items-center"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                    <img
                      src={imageUrl}
                      alt={`Imagen de ${property.name}`}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold">{property.name}</h3>
                    <p className="text-gray-600">{property.city}</p>
                    <p className="font-medium">
                      Precio por noche:{" "}
                      <span className="text-green-500">${property.price}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={toggleFormVisibility}
              className="w-60 py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            >
              {isFormVisible ? "Cancelar" : "Añadir Nueva Propiedad"}
            </button>
          </div>
          {isFormVisible && !editingProperty && <PropertyForm />}
        </>
      )}
    </div>
  );
};

export default MyProperties;