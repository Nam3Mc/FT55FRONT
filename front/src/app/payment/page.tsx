"use client";
<<<<<<< HEAD

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

interface PaymentDto {
  url: string;
  contractId: string;
}

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

  useEffect(() => {
    const sendPaymentData = async () => {
      const contractId = "805115c1-39b1-4a37-b3f4-b90dab92ddba"
      const currentUrl = window.location.href;
      
      if (contractId) {
        const paymentData: PaymentDto = {
          url: currentUrl,
          contractId: contractId,
        };

        try {
          await axios.post("http://localhost:3000/payments/paid", paymentData);
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
=======
import SuccessPage from "@/components/successPay/page";

const ProfilePage: React.FC = () => {
  return <SuccessPage />;
};

export default ProfilePage;
>>>>>>> 4997db48f9666c8adfa8335dfe31f16ca5a3af9e
