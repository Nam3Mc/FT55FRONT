"use client";

import { useSearchParams } from "next/navigation";

const FailurePage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
      <h1 className="text-2xl font-bold">Pago fallido</h1>
      <p className="mt-4">No se pudo completar tu compra.</p>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <p>
          <strong>Estado:</strong> {status}
        </p>
        <p>
          <strong>Referencia externa:</strong> {externalReference}
        </p>
      </div>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default FailurePage;
