// import React from "react";
// import usePropertyForm from "@/hooks/UserDashboard/usePropertyForm";
// import { IPropiedad } from "@/interfaces/properties";

// interface PropertyEditFormProps {
//     property: IPropiedad;
//     onCancel: () => void; 
//   }

//   const PropertyEditForm: React.FC<PropertyEditFormProps> = ({ property, onCancel}) => {
//     const {
//         formData,
//         errors,
//         isLoading,
//         handleChange,
//         handleSubmit,
//         setFormData,
//         handleDeleteImage,
//         handleAddressChange,
//         handleFileChange,
//     } = usePropertyForm({ property });

//     return (
//         <form
//           onSubmit={handleSubmit}
//           className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md"
//         >
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Editar Propiedad
//           </h2>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">
//               Título de la Propiedad:
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Descripción:</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm">{errors.description}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Precio:</label>
//             <input
//               type="number"
//               name="price"
//               min="0"
//               step="any"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Pais:</label>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Provincia:</label>
//             <input
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Ciudad:</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Dirección:</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleAddressChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.address && (
//               <p className="text-red-500 text-sm">{errors.address}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Habitaciones:</label>
//             <input
//               type="number"
//               name="bedrooms"
//               min="0"
//               step="any"
//               value={formData.bedrooms}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.bedrooms && (
//               <p className="text-red-500 text-sm">{errors.bedrooms}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Baños:</label>
//             <input
//               type="number"
//               name="bathrooms"
//               min="0"
//               step="any"
//               value={formData.bathrooms}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.bathrooms && (
//               <p className="text-red-500 text-sm">{errors.bathrooms}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">Capacidad:</label>
//             <input
//               type="number"
//               name="capacity"
//               min="0"
//               step="any"
//               value={formData.capacity}
//               onChange={handleChange}
//               required
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             {errors.capacity && (
//               <p className="text-red-500 text-sm">{errors.capacity}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">¿Tiene wifi?</label>
//             <input
//               type="checkbox"
//               name="wifi"
//               checked={formData.wifi}
//               onChange={handleChange}
//               className="mt-2"
//             />
//             {errors.wifi && <p className="text-red-500 text-sm">{errors.wifi}</p>}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">¿Tiene TV?</label>
//             <input
//               type="checkbox"
//               name="tv"
//               checked={formData.tv}
//               onChange={handleChange}
//               className="mt-2"
//             />
//             {errors.tv && <p className="text-red-500 text-sm">{errors.tv}</p>}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">
//               ¿Tiene aire acondicionado?
//             </label>
//             <input
//               type="checkbox"
//               name="airConditioning"
//               checked={formData.airConditioning}
//               onChange={handleChange}
//               className="mt-2"
//             />
//             {errors.airConditioning && (
//               <p className="text-red-500 text-sm">{errors.airConditioning}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">¿Tiene piscina?</label>
//             <input
//               type="checkbox"
//               name="piscina"
//               checked={formData.piscina}
//               onChange={handleChange}
//               className="mt-2"
//             />
//             {errors.piscina && (
//               <p className="text-red-500 text-sm">{errors.piscina}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">
//               ¿Tiene parqueadero?
//             </label>
//             <input
//               type="checkbox"
//               name="parqueadero"
//               checked={formData.parqueadero}
//               onChange={handleChange}
//               className="mt-2"
//             />
//             {errors.parqueadero && (
//               <p className="text-red-500 text-sm">{errors.parqueadero}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">¿Tiene cocina?</label>
//             <input
//               type="checkbox"
//               name="cocina"
//               checked={formData.cocina}
//               onChange={handleChange}
//               className="mt-2"
//             />
//             {errors.cocina && (
//               <p className="text-red-500 text-sm">{errors.cocina}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">
//               ¿Se permiten menores?
//             </label>
//             <input
//               type="checkbox"
//               name="hasMinor"
//               checked={formData.hasMinor}
//               onChange={handleChange}
//               className="mt-2"
//             />
//             {errors.hasMinor && (
//               <p className="text-red-500 text-sm">{errors.hasMinor}</p>
//             )}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">
//               ¿Se permiten mascotas?
//             </label>
//             <input
//               type="checkbox"
//               name="pets"
//               checked={formData.pets}
//               onChange={handleChange}
//               className="mt-2"
//             />
//             {errors.pets && <p className="text-red-500 text-sm">{errors.pets}</p>}
//           </div>
    
//           <div className="mb-4">
//             <label className="block text-gray-800 text-lg">
//               Tipo de Propiedad:
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={(e) =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   type: e.target.value,
//                 }))
//               }
//               className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//               required
//             >
//               <option value="">Seleccione un tipo</option>
//               <option value="casa">Casa</option>
//               <option value="apartamento">Apartamento</option>
//               <option value="habitacion">Habitación</option>
//             </select>
//             {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
//           </div>
    
//           <div className="mb-4">
//         <label className="block text-gray-800 text-lg">Imágenes:</label>
//         <input
//           type="file"
//           multiple
//           name="image"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//         />
//         {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
//         {formData.images.length > 0 && (
//           <div className="mt-2">
//             <p className="text-gray-600">Imágenes seleccionadas:</p>
//             <ul className="flex space-x-4">
//               {formData.images.map((image, index) => (
//                 <li key={index} className="flex-shrink-0 relative">
//                   <img
//                     src={image}
//                     alt={`Preview ${index}`}
//                     className="w-16 h-16 object-cover"
//                   />
//                   <button
//                     onClick={() => handleDeleteImage(image,index)}
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                   >
//                     X
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-velvet hover:bg-[#1b276b] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//       >
//         {isLoading ? "Cargando..." : "Guardar Propiedad"}
//       </button>
//     </form>
//   );
// };

// export default PropertyEditForm;