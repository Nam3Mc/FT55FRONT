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

import React, { useState } from "react";
import useProperties from "@/hooks/UserDashboard/useProperties";
import useEditProperty from "@/hooks/UserDashboard/useEditProperty";
import RentPropertyForm from "@/components/propertyForm/page";
import PropertyDetail from "@/components/propertyDetail/page";
import { FiEdit } from "react-icons/fi";
import { IPropiedad } from "@/interfaces/properties";
import { TypeOfProperty } from '@/helpers/typeOfProperty';


const MyProperties: React.FC = () => {
  const { properties, loading, error, setProperties } = useProperties();
  const {
    editingProperty,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleCancelClick,
  } = useEditProperty();
  const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handlePropertyClick = (property: IPropiedad) => {
    setSelectedProperty(property); 
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>

      {loading && <p>Cargando propiedades...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {properties.length === 0 && !loading && !error && (
        <p className="text-gray-500">
          Aún no tienes propiedades. Crea una nueva propiedad para comenzar.
        </p>
      )}

      {selectedProperty ? (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      ) : (
        <ul className="space-y-4">
          {properties.map((property) =>
            editingProperty && editingProperty.id === property.id ? (
              <li key={property.id} className="relative p-4 border border-gray-200 rounded-md shadow-sm">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveClick(setProperties);
                  }} 
                  className="space-y-4"
                >
                  <div className="mb-4">
                    <label className="block font-semibold">Título de la propiedad:</label>
                    <input
                      type="text"
                      name="name"
                      value={editingProperty.name}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold">Descripción:</label>
                    <textarea
                      name="description"
                      value={editingProperty.description}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold">Precio:</label>
                    <input
                      type="number"
                      name="price"
                      value={editingProperty.price || 0}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>

                  <div className="mb-4">
                <label className="block text-gray-800 text-lg">Pais:</label>
                <input
                  type="text"
                  name="state"
                  value={editingProperty.state}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

                  <div className="mb-4">
                    <label className="block text-gray-800 text-lg">Ciudad:</label>
                    <input
                      type="text"
                      name="city"
                      value={editingProperty.city}
                      onChange={handleInputChange}
                      className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-800 text-lg">Dirección:</label>
                    <input
                      type="text"
                      name="address"
                      value={editingProperty.address}
                      onChange={handleInputChange}
                      className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                 <label className="block text-gray-800 text-lg">Habitaciones:</label>
                <input
                  type="number"
                  name="bedrooms"
                  min="0" step="any"
                  value={editingProperty.bedrooms}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
        
              <div className="mb-4">
                <label className="block text-gray-800 text-lg">Baños:</label>
                <input
                  type="number"
                  name="bathrooms"
                  min="0" step="any"
                  value={editingProperty.bathrooms}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />

              </div>
        
              <div className="mb-4">
                <label className="block text-gray-800 text-lg">Capacidad:</label>
                <input
                  type="number"
                  name="capacity"
                  min="0" step="any"
                  value={editingProperty.capacity}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">¿Tiene wifi?</label>
            <input
              type="checkbox"
              name="wifi"
              checked={editingProperty.amenities_?.wifi || false}
              onChange={handleInputChange}
              className="mt-2"
            />

          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">¿Tiene TV?</label>
            <input
              type="checkbox"
              name="tv"
              checked={editingProperty.amenities_?.tv|| false}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">¿Tiene aire acondicionado?</label>
            <input
              type="checkbox"
              name="airConditioning"
              checked={editingProperty.amenities_?.airConditioning|| false}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">¿Tiene piscina?</label>
            <input
              type="checkbox"
              name="piscina"
              checked={editingProperty.amenities_?.piscina|| false}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">¿Tiene parqueadero?</label>
            <input
              type="checkbox"
              name="parqueadero"
              checked={editingProperty.amenities_?.parqueadero|| false}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">¿Tiene cocina?</label>
            <input
              type="checkbox"
              name="cocina"
              checked={editingProperty.amenities_?.cocina|| false}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
    
               <div className="mb-4">
                <label className="block text-gray-800 text-lg">¿Se permiten menores?</label>
                 <input
                  type="checkbox"
                  name="hasMinor"
                  checked={editingProperty.hasMinor|| false}
                  onChange={handleInputChange}
                  className="mt-2"
                />
              </div>
        
              <div className="mb-4">
                <label className="block text-gray-800 text-lg">¿Se permiten mascotas?</label>
                <input
                  type="checkbox"
                  name="pets"
                  checked={editingProperty.pets|| false}
                  onChange={handleInputChange}
                  className="mt-2"
                />
              </div>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 ml-2"
                  >
                    Cancelar
                  </button>
                </form>
              </li>
            ) : (
              <li
                key={property.id}
                className="relative p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
                onClick={() => handlePropertyClick(property)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(property);
                  }}
                  className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
                >
                  <FiEdit />
                </button>
                <div className="flex items-center">
                  <img
                    src={property.image_?.[0]?.url || "/path/to/default-image.jpg"}
                    alt={property.name}
                    className="w-48 h-48 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{property.name}</h3>
                    <p className="text-gray-600">{property.city}</p>
                    <p className="font-medium">
                      Precio por noche:{" "}
                      <span className="text-green-500">
                        ${property.price}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={toggleFormVisibility}
          className="w-60 py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {isFormVisible ? "Ocultar Formulario" : "Agregar Propiedad"}
        </button>
      </div>

      {isFormVisible && <RentPropertyForm />}
    </div>
  );
};

export default MyProperties;


