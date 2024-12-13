"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CheckoutPreview = () => {
  const router = useRouter(); // Hook para manejar la navegación

  const handlePayment = () => {
    router.push("/successPage"); // Cambia "/payment" por la ruta del componente destino
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-6 bg-silk text-black">
      {/* Columna Izquierda */}
      <div className="flex-1 pr-6">
        <h1 className="text-2xl font-bold mb-4">Confirmá y pagá</h1>

        {/* Tarjeta de información del viaje */}
        <div className="bg-pearl p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Tu viaje</h2>
          {/* Fechas */}
          <div className="flex justify-between mb-4">
            <span>Fechas</span>
            <button className="text-champagne underline">Editar</button>
          </div>
          <p className="mb-4">14 – 19 de ene. de 2025</p>

          {/* Huéspedes */}
          <div className="flex justify-between mb-4">
            <span>Húespedes</span>
            <button className="text-champagne underline">Editar</button>
          </div>
          <p>1 viajero</p>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="w-full md:w-1/3 bg-pearl p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <Image
            src="/banner.jpeg"
            alt="Casa frente al lago"
            width={300}
            height={200}
            className="rounded-lg"
          />
        </div>
        <h3 className="text-lg font-bold mb-2">Casa con hermosa vista</h3>
        <p className="text-sm mb-4">
          Cabaña entera • ⭐ 5,00 (10 evaluaciones)
        </p>

        <hr className="border-marble mb-4" />

        {/* Detalles del precio */}
        <div className="flex justify-between mb-2">
          <span>$100,00 USD por 5 noches</span>
          <span className="font-semibold">$500,00 USD</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tarifa de limpieza</span>
          <span className="font-semibold">$20,00 USD</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tarifa por servicio de Airbnb</span>
          <span className="font-semibold">$73,41 USD</span>
        </div>

        <hr className="border-marble my-4" />

        {/* Total y botón */}
        <div className="flex justify-between items-center text-lg font-bold mb-4">
          <span>Total (USD)</span>
          <span>$593,41 USD</span>
        </div>
        <button
          onClick={handlePayment}
          className="w-full py-3 bg-champagne text-pearl font-bold rounded-lg hover:bg-velvet hover:text-champagne transition"
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default CheckoutPreview;
