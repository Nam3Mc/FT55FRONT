// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/authStore";

// export const AdminNavbar: React.FC = () => {
//   const { user, resetForm } = useAuthStore();
//   const [userData, setUserData] = useState(user);
//   const [isClick, setIsClick] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     setUserData(user);
//   }, [user]);

//   useEffect(() => {
//     const dataUser = localStorage.getItem("user");
//     setUserData(JSON.parse(dataUser!));
//   }, [pathname]);

//   const toggleMenu = (): void => {
//     setIsClick(!isClick);
//   };

//   const handleLogOutAdmin = () => {
//     //localStorage.removeItem("user");
//     useAuthStore.getState().logoutUser();
//     setUserData(null);
//     router.push("/");
//   };

//   return (
//     <nav className="bg-velvet">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
//         <div className="md:hidden flex items-center">
//           <button
//             className="p-2 rounded-md text-silk focus:outline-none focus:ring-2 focus:ring-inset focus:ring-silk"
//             onClick={toggleMenu}
//           >
//             {isClick ? (
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         <div className="flex justify-center flex-1 lg:mr-32">
//           <Link href="">
//             <Image src="/logofinal.png" alt="logo" width={200} height={70} />
//           </Link>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="hidden lg:flex items-center space-x-6">
//             <button
//               onClick={handleLogOutAdmin}
//               className="bg-silk text-velvet w-full py-2 px-4 rounded mb-4 hover:bg-champagne hover:text-white mt-4"
//             >
//               Cerrar Sesion
//             </button>
//           </div>
//         </div>
//       </div>

//       {isClick && (
//         <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <button
//             onClick={handleLogOutAdmin}
//             className="bg-silk text-velvet w-full py-2 px-4 rounded mb-4 hover:bg-champagne hover:text-white mt-4"
//           >
//             Cerrar Sesion
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default AdminNavbar;
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export const AdminNavbar: React.FC = () => {
  const user = useAuthStore((state) => state.user); // Suscribirse directamente al estado del usuario
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const [isClick, setIsClick] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = (): void => {
    setIsClick(!isClick);
  };

  const handleLogOutAdmin = () => {
    logoutUser(); // Llamar a la función de logout
    router.push("/"); // Redirigir al usuario a la página de inicio
  };

  return (
    <nav className="bg-velvet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-md text-silk focus:outline-none focus:ring-2 focus:ring-inset focus:ring-silk"
            onClick={toggleMenu}
          >
            {isClick ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="flex justify-center flex-1 lg:mr-32">
          <Link href="">
            <Image src="/logofinal.png" alt="logo" width={200} height={70} />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? ( // Verificar si hay un usuario autenticado
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={handleLogOutAdmin}
                className="bg-silk text-velvet w-full py-2 px-4 rounded mb-4 hover:bg-champagne hover:text-white mt-4"
              >
                Cerrar Sesion
              </button>
            </div>
          ) : (
            <p className="text-white">No hay usuario autenticado</p>
          )}
        </div>
      </div>

      {isClick && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={handleLogOutAdmin}
            className="bg-silk text-velvet w-full py-2 px-4 rounded mb-4 hover:bg-champagne hover:text-white mt-4"
          >
            Cerrar Sesion
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
