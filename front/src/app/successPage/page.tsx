"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SuccessPage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log("Botón OK clickeado");
    router.push("/"); // Redirige a la página de inicio o cualquier otra
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        ¡Tu pago fue procesado con éxito!
      </h1>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        OK
      </button>
    </div>
  );
};

export default SuccessPage;
