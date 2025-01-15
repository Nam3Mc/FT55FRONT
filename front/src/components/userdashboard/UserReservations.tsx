// import React from "react";
// import useReservations from "@/hooks/UserDashboard/useReservations";

// const UserReservations: React.FC<{ userId: string }> = ({ userId }) => {
//   const { reservations, loading, error } = useReservations(userId);

//   if (loading) return <p>Cargando...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md mb-8">
//       <h2 className="text-2xl font-bold mb-4">Reservas del Usuario</h2>
//       <ul className="space-y-4">
//         {reservations.length > 0 ? (
//           reservations.map((reservationDetail) => (
//             <li
//               key={reservationDetail.id}
//               className="flex items-center p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
//             >
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold">
//                   {reservationDetail.property.name}
//                 </h3>
//                 <p className="text-gray-600">
//                   Fecha de entrada:{" "}
//                   <span className="text-blue-500">
//                     {reservationDetail.checkIn}
//                   </span>
//                 </p>
//                 <p className="text-gray-600">
//                   Fecha de salida:{" "}
//                   <span className="text-blue-500">
//                     {reservationDetail.checkOut}
//                   </span>
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Huéspedes: {reservationDetail.pax}
//                 </p>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500">No tienes reservas.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default UserReservations;

import React from "react";

const UserReservations = () => {
  return (
    <div>
      <h1>Reservas</h1>
    </div>
  );
};

export default UserReservations;
