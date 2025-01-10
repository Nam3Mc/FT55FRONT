"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

  useEffect(() => {
    const sendPaymentData = async () => {
      const contractId = localStorage.getItem("contract_id");
      const currentUrl = window.location.href;
      
      if (contractId) {
        try {
          await axios.post("https://rentafacil.onrender.com/payments/paid", {
            url: currentUrl,
            contract_id: contractId,
          });
          console.log("Datos enviados exitosamente.");
        } catch (error) {
          console.error("Error al enviar los datos: ", error);
        }
      } else {
        console.warn("No se encontró contract_id en localStorage.");
      }
    };

    sendPaymentData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-green-800">
      <h1 className="text-2xl font-bold">¡Pago exitoso!</h1>
      <p className="mt-4">Gracias por tu compra.</p>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <p>
          <strong>ID del pago:</strong> {paymentId}
        </p>
        <p>
          <strong>Estado:</strong> {status}
        </p>
        <p>
          <strong>Referencia externa:</strong> {externalReference}
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
