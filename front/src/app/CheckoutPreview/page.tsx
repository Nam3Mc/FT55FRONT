/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import CheckoutIzq from "../../components/checkout_izq";
import CheckoutDer from "@/components/checkout_der";

const CheckoutPreview = () => {
  const router = useRouter(); // Hook para manejar la navegación
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const handlePayment = async () => {
    setLoading(true); // Activa el estado de carga
    try {
      // Enviar datos al backend para crear la preferencia de pago
      const response = await fetch("http://localhost:3002/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Casa con hermosa vista",
          price: 593.41, // Total calculado
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (data.init_point) {
        // Redirigir al usuario al enlace de pago de Mercado Pago
        window.location.href = data.init_point;
      } else {
        console.error("Error al generar el enlace de pago");
        alert("Hubo un error al procesar tu pago. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Ocurrió un error. Por favor, inténtalo más tarde.");
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-6 bg-silk text-black">
      <CheckoutIzq />

      <div className="w-full md:w-1/3 bg-pearl p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <CheckoutDer />
        </div>
        <button
          onClick={handlePayment}
          className="w-full py-3 bg-champagne text-pearl font-bold rounded-lg hover:bg-velvet hover:text-champagne transition"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Pagar"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPreview;
