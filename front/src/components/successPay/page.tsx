"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
=======

interface PaymentDto {
  url: string;
  contractId: string;
}
>>>>>>> 4997db48f9666c8adfa8335dfe31f16ca5a3af9e

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

  useEffect(() => {
    const sendPaymentData = async () => {
<<<<<<< HEAD
      const contractId = localStorage.getItem("contract_id");
      const currentUrl = window.location.href;
      
      if (contractId) {
        try {
          await axios.post("http://localhost:3000/payments/paid", {
            url: currentUrl,
            contract_id: contractId,
          });
          console.log("Datos enviados exitosamente.");
        } catch (error) {
          console.error("Error al enviar los datos: ", error);
=======
      const contractId = "local storage id"; // aqui colocas el id desde el local storage para que se envie al back y se genere el cambio de estadod de la reservacion
      const currentUrl = window.location.href;

      if (contractId) {
        const paymentData: PaymentDto = {
          url: currentUrl,
          contractId: contractId,
        };

        try {
          await axios.post("http://localhost:3002/payments/paid", paymentData);
          console.log("Datos enviados exitosamente.");
        } catch (err) {
          console.error("Error al enviar los datos: ", err);
>>>>>>> 4997db48f9666c8adfa8335dfe31f16ca5a3af9e
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
