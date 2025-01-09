// import React, { useState } from "react";
// import useProperties from "@/hooks/UserDashboard/useProperties";
// import useEditProperty from "@/hooks/UserDashboard/useEditProperty";
// import RentPropertyForm from "@/components/propertyForm/page";
// import PropertyDetail from "@/components/propertyDetail/page";
// import { FiEdit } from "react-icons/fi";
// import { IPropiedad } from "@/interfaces/properties";

// const MyProperties: React.FC = () => {
//   const { properties, loading, error, setProperties } = useProperties();
//   const {
//     editingProperty,
//     handleEditClick,
//     handleInputChange,
//     handleSaveClick,
//     handleCancelClick,
//   } = useEditProperty();
//   const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const handlePropertyClick = (property: IPropiedad) => {
//     setSelectedProperty(property);
//   };

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md mb-8">
//       <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>

//       {loading && <p>Cargando propiedades...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {properties.length === 0 && !loading && !error && (
//         <p className="text-gray-500">
//           Aún no tienes propiedades. Crea una nueva propiedad para comenzar.
//         </p>
//       )}

//       {selectedProperty ? (
//         <PropertyDetail
//           property={selectedProperty}
//           onClose={() => setSelectedProperty(null)}
//         />
//       ) : (
//         <ul className="space-y-4">
//           {properties.map((property) =>
//             editingProperty && editingProperty.id === property.id ? (
//               <li key={property.id} className="relative p-4 border border-gray-200 rounded-md shadow-sm">
//                 <div className="mb-4">
//                   <label className="block font-semibold">Título:</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={editingProperty.title}
//                     onChange={handleInputChange}
//                     className="border border-gray-300 rounded-md p-2 w-full"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block font-semibold">Descripción:</label>
//                   <textarea
//                     name="description"
//                     value={editingProperty.description}
//                     onChange={handleInputChange}
//                     className="border border-gray-300 rounded-md p-2 w-full"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block font-semibold">Precio:</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={editingProperty.price || 0}
//                     onChange={handleInputChange}
//                     className="border border-gray-300 rounded-md p-2 w-full"
//                   />
//                 </div>
//                 <button
//                   onClick={() => handleSaveClick(setProperties)}
//                   className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
//                 >
//                   Guardar
//                 </button>
//                 <button
//                   onClick={handleCancelClick}
//                   className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 ml-2"
//                 >
//                   Cancelar
//                 </button>
//               </li>
//             ) : (
//               <li
//                 key={property.id}
//                 className="relative p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
//                 onClick={() => handlePropertyClick(property)}
//               >
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleEditClick(property);
//                   }}
//                   className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
//                 >
//                   <FiEdit />
//                 </button>
//                 <div className="flex items-center">
//                 <img
//                     src={property.image_?.[0]?.url || "/path/to/default-image.jpg"}
//                     alt={property.title}
//                     className="w-48 h-48 object-cover rounded-md mr-4"
//                   />
//                   <div>
//                     <h3 className="text-xl font-semibold">{property.title}</h3>
//                     <p className="text-gray-600">{property.city}</p>
//                     <p className="font-medium">
//                       Precio por noche:{" "}
//                       <span className="text-green-500">
//                         ${property.price}
//                       </span>
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Capacidad: {property.capacity} personas,{" "}
//                       {property.bedrooms} habitaciones,{" "}
//                       {property.bathrooms} baño(s)
//                     </p>
//                   </div>
//                 </div>
//               </li>
//             )
//           )}
//         </ul>
//       )}

//       <div className="flex justify-end mt-4">
//         <button
//           onClick={toggleFormVisibility}
//           className="w-60 py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] focus:outline-none focus:ring-2 focus:ring-gray-500"
//         >
//           {isFormVisible ? "Ocultar Formulario" : "Agregar Propiedad"}
//         </button>
//       </div>

//       {isFormVisible && <RentPropertyForm />}
//     </div>
//   );
// };

// export default MyProperties;

/////////////////

// import React, { useEffect, useState } from "react";
// import { IPropiedad } from "@/interfaces/properties";
// import PropertyForm from "@/components/propertyForm/page";
// import PropertyEditForm from "@/components/propertyEditForm/page";
// import { FiEdit } from "react-icons/fi";
// import IFormData from "@/interfaces/formData";

// interface MyPropertiesProps {}

// const MyProperties: React.FC<MyPropertiesProps> = () => {
//   const [properties, setProperties] = useState<IPropiedad[]>([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingProperty, setEditingProperty] = useState<IPropiedad | null>(null);
//   const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       const userId = parsedUser.account_.id;

//       fetch(`http://localhost:3002/property/owner/${userId}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Error al obtener propiedades");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           const userProperties = data.filter(
//             (property: IPropiedad) => property.account_.id === userId
//           );
//           setProperties(userProperties);
//         })
//         .catch((error) => console.error("Error al obtener propiedades:", error));
//     }
//   }, []);

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//     setEditingProperty(null);
//   };

//   const handleEditClick = (property: IPropiedad) => {
//     try {
//       if (!property) throw new Error("La propiedad es nula o indefinida.");
//       setEditingProperty(property);
//     } catch (error) {
//       console.error("Error al obtener la propiedad:", error);
//     }
//   };

//   const handlePropertyClick = (property: IPropiedad) => {
//     setSelectedProperty(property);
//   };

//   const closeDetails = () => {
//     setSelectedProperty(null);
//   };

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md mb-8">
//       <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>

//       {selectedProperty ? (
//         <div className="p-4 border border-gray-200 rounded-md shadow-md">
//           <button
//             onClick={closeDetails}
//             className="mb-4 p-2 text-black rounded-lg hover:underline"
//           >
//             Volver a la lista
//           </button>
//           <img
//             src={
//               selectedProperty.image_ && selectedProperty.image_.length > 0
//                 ? selectedProperty.image_[0].url
//                 : "/placeholder-image.png"
//             }
//             alt={`Imagen de ${selectedProperty.name}`}
//             className="w-full h-48 object-cover rounded-md mb-4"
//           />
//           <h3 className="text-xl font-bold">{selectedProperty.name}</h3>
//           <p>{selectedProperty.description}</p>
//           <p className="text-gray-600">
//             Ubicación: {selectedProperty.city}, {selectedProperty.state}
//           </p>
//           <p className="font-medium">
//             Precio por noche:{" "}
//             <span className="text-green-500">${selectedProperty.price}</span>
//           </p>
//           <p className="text-sm text-gray-500">
//             Capacidad: {selectedProperty.capacity} personas,{" "}
//             {selectedProperty.bedrooms} habitaciones,{" "}
//             {selectedProperty.bathrooms} baño(s)
//           </p>
//         </div>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {properties.map((property) => {
//               const imageUrl =
//                 property.image_ && property.image_.length > 0
//                   ? property.image_[0].url
//                   : "/placeholder-image.png";

//               return (
//                 <li
//                   key={property.id}
//                   className="relative p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 cursor-pointer"
//                   onClick={() => handlePropertyClick(property)}
//                 >
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEditClick(property);
//                     }}
//                     className="absolute top-2 right-2 p-2 bg-champagne text-black rounded-full hover:bg-yellow-600 flex items-center"
//                   >
//                     <FiEdit className="w-5 h-5" />
//                   </button>
//                   <img
//                     src={imageUrl}
//                     alt={`Imagen de ${property.name}`}
//                     className="w-full h-48 object-cover rounded-md mb-4"
//                   />
//                   <h3 className="text-xl font-semibold">{property.name}</h3>
//                   <p className="text-gray-600">{property.city}</p>
//                   <p className="font-medium">
//                     Precio por noche:{" "}
//                     <span className="text-green-500">${property.price}</span>
//                   </p>
//                 </li>
//               );
//             })}
//           </ul>
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={toggleFormVisibility}
//               className="w-60 py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
//             >
//               {isFormVisible ? "Cancelar" : "Añadir Nueva Propiedad"}
//             </button>
//           </div>
//           {isFormVisible && !editingProperty && <PropertyForm />}
//           {editingProperty && <PropertyEditForm property={editingProperty} />}
//         </>
//       )}
//     </div>
//   );
// };
// export default MyProperties;

import React, { useEffect, useState } from "react";
import { IPropiedad } from "@/interfaces/properties";
import PropertyForm from "@/components/propertyForm/page";
import PropertyEditForm from "@/components/propertyEditForm/page";
import { FiEdit } from "react-icons/fi";
import IFormData from "@/interfaces/formData";

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
 
        fetch(`http://localhost:3002/users/${userId}`)
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

            return fetch(`http://localhost:3002/property/owner/${accountId}`);
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

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>

      {editingProperty ? (
        <PropertyEditForm property={editingProperty} />
      ) : (
        <>
          {selectedProperty ? (
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
                alt={`Imagen de ${selectedProperty.title}`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold">{selectedProperty.title}</h3>
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
                      alt={`Imagen de ${property.title}`}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold">{property.title}</h3>
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
