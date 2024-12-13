"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Rejectedpayment: React.FC = () => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Previene cualquier comportamiento por defecto del botón
    console.log("Botón Volver clickeado");
    router.push("/"); // Redirige a la página de inicio u otra deseada
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Pago rechazado</h1>
      <p className="text-gray-700 mb-6">
        Hubo un problema al procesar tu pago. Por favor, intenta de nuevo.
      </p>
      <button
        onClick={handleClick}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
      >
        Volver
      </button>
    </div>
  );
};

export default Rejectedpayment;
