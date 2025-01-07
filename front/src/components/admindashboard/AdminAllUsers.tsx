import React, { useState } from "react";
import useUsers from "../../hooks/AdminDashboard/useUsers";
import IUser from "../../interfaces/user";

const AllUsers: React.FC = () => {
  const { users, loading, error, handleActivate, handleDesactivate } = useUsers();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});


  const handleImageError = (id: string) => {
    setBrokenImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Lista de Usuarios
      </h2>

      {selectedUser ? (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
          <button
            className="text-blue-500 mb-4"
            onClick={() => setSelectedUser(null)}
          >
            Volver a la lista
          </button>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={
                selectedUser && !brokenImages[selectedUser.id]
                  ? selectedUser.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png"
                  : "https://cdn-icons-png.flaticon.com/512/61/61205.png"
              }
              alt={`${selectedUser.name} ${selectedUser.lastName}`}
              className="h-24 w-24 rounded-full object-cover"
              onError={() => {
                if (selectedUser) {
                  handleImageError(selectedUser.id);
                }
              }}
            />
            <div className="text-center md:text-left flex flex-col space-y-4 w-full">
              <h3 className="text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedUser.name} {selectedUser.lastName}
              </h3>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                Email: {selectedUser.email}
              </p>
              <p className="text-gray-600">
                Estado: {selectedUser.isActive ? "Activo" : "Desactivado"}
              </p>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                Teléfono: {selectedUser.phone || "No disponible"}
              </p>
              <button
                className={`mt-4 px-4 py-2 rounded-md text-white ${
                  selectedUser.isActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() =>
                  selectedUser.isActive
                    ? handleDesactivate(selectedUser.id)
                    : handleActivate(selectedUser.id)
                }
              >
                {selectedUser.isActive ? "Desactivar" : "Activar"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={
                    brokenImages[user.id]
                      ? "https://cdn-icons-png.flaticon.com/512/61/61205.png"
                      : user.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png"
                  }
                  alt={`${user.name} ${user.lastName}`}
                  className="h-20 w-20 rounded-full object-cover"
                  onError={() => handleImageError(user.id)}
                />
                <div className="text-center sm:text-left flex flex-col space-y-4 w-full">
                  <h3 className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.name} {user.lastName}
                  </h3>
                  <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                    Email: {user.email}
                  </p>
                  <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                    Estado: {user.isActive ? "Activo" : "Desactivado"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-2">No hay usuarios para mostrar.</p>
          )}
        </div>
      )}
    </div>
//     <div className="bg-white p-6 rounded-md shadow-md mb-8">
//   <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
//     Lista de Usuarios
//   </h2>

//   {selectedUser ? (
//     <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
//       <button
//         className="text-blue-500 mb-4"
//         onClick={() => setSelectedUser(null)}
//       >
//         Volver a la lista
//       </button>
//       <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
//       <img
//   src={
//     selectedUser && !brokenImages[selectedUser.id]
//       ? selectedUser.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png"
//       : "https://cdn-icons-png.flaticon.com/512/61/61205.png"
//   }
//   alt={selectedUser ? `${selectedUser.name} ${selectedUser.lastName}` : "Usuario"}
//   className="h-24 w-24 rounded-full object-cover"
//   onError={() => {
//     if (selectedUser) {
//       handleImageError(selectedUser.id);
//     }
//   }}
// />


//         <div className="text-center md:text-left flex flex-col space-y-4 w-full">
//           <h3 className="text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
//             {selectedUser.name} {selectedUser.lastName}
//           </h3>
//           <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
//             Email: {selectedUser.email}
//           </p>
//           <p className="text-gray-600">
//             Estado: {selectedUser.isActive ? "Activo" : "Desactivado"}
//           </p>
//           <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
//             Teléfono: {selectedUser.phone || "No disponible"}
//           </p>
//           <button
//             className={`mt-4 px-4 py-2 rounded-md text-white ${
//               selectedUser.isActive
//                 ? "bg-red-500 hover:bg-red-600"
//                 : "bg-green-500 hover:bg-green-600"
//             }`}
//             onClick={() =>
//               selectedUser.isActive
//                 ? handleDesactivate(selectedUser.id)
//                 : handleActivate(selectedUser.id)
//             }
//           >
//             {selectedUser.isActive ? "Desactivar" : "Activar"}
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
//       {users.length > 0 ? (
//         users.map((user) => (
//           <div
//             key={user.id}
//             className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 cursor-pointer"
//             onClick={() => setSelectedUser(user)}
//           >
//             <img
//               src={
//                 brokenImages[user.id]
//                   ? "https://cdn-icons-png.flaticon.com/512/61/61205.png"
//                   : user.photo
//               }
//               alt={`${user.name} ${user.lastName}`}
//               className="h-20 w-20 rounded-full object-cover"
//               onError={() => handleImageError(user.id)}
//             />
//             <div className="text-center sm:text-left flex flex-col space-y-4 w-full">
//               <h3 className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
//                 {user.name} {user.lastName}
//               </h3>
//               <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
//                 Email: {user.email}
//               </p>
//               <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
//                 Estado: {user.isActive ? "Activo" : "Desactivado"}
//               </p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center col-span-2">No hay usuarios para mostrar.</p>
//       )}
//     </div>
//   )}
// </div>
///////////////

  //   <div className="bg-white p-6 rounded-md shadow-md mb-8">
  //   <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>

  //   {selectedUser ? (
  //     <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
  //       <button
  //         className="text-blue-500 mb-4"
  //         onClick={() => setSelectedUser(null)}
  //       >
  //         Volver a la lista
  //       </button>
  //       <div className="flex items-center space-x-4">
  //         <img
  //           src={
  //             brokenImages[selectedUser.id]
  //               ? "https://cdn-icons-png.flaticon.com/512/61/61205.png"
  //               : selectedUser.photo
  //           }
  //           alt={`${selectedUser.name} ${selectedUser.lastName}`}
  //           className="h-24 w-24 rounded-full object-cover"
  //           onError={() => handleImageError(selectedUser.id)}
  //         />
  //         <div>
  //           <h3 className="text-2xl font-bold">
  //             {selectedUser.name} {selectedUser.lastName}
  //           </h3>
  //           <p className="text-gray-600">Email: {selectedUser.email}</p>
  //           <p className="text-gray-600">
  //             Estado: {selectedUser.isActive ? "Activo" : "Desactivado"}
  //           </p>
  //           <p className="text-gray-600">
  //             Teléfono: {selectedUser.phone || "No disponible"}
  //           </p>
  //           <button
  //             className={`mt-4 px-4 py-2 rounded-md text-white ${
  //               selectedUser.isActive
  //                 ? "bg-red-500 hover:bg-red-600"
  //                 : "bg-green-500 hover:bg-green-600"
  //             }`}
  //             onClick={() =>
  //               selectedUser.isActive
  //                 ? handleDesactivate(selectedUser.id)
  //                 : handleActivate(selectedUser.id)
  //             }
  //           >
  //             {selectedUser.isActive ? "Desactivar" : "Activar"}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   ) : (
  //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  //       {users.length > 0 ? (
  //         users.map((user) => (
  //           <div
  //             key={user.id}
  //             className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 flex items-center space-x-4 cursor-pointer"
  //             onClick={() => setSelectedUser(user)}
  //           >
  //             <img
  //               src={
  //                 brokenImages[user.id]
  //                   ? "https://cdn-icons-png.flaticon.com/512/61/61205.png"
  //                   : user.photo
  //               }
  //               alt={`${user.name} ${user.lastName}`}
  //               className="h-20 w-20 rounded-full object-cover"
  //               onError={() => handleImageError(user.id)}
  //             />
  //             <div>
  //               <h3 className="text-xl font-semibold">
  //                 {user.name} {user.lastName}
  //               </h3>
  //               <p className="text-gray-600">Email: {user.email}</p>
  //               <p className="text-sm text-gray-500">
  //                 Estado: {user.isActive ? "Activo" : "Desactivado"}
  //               </p>
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <p>No hay usuarios para mostrar.</p>
  //       )}
  //     </div>
  //   )}
  // </div>
  );
};

export default AllUsers;
