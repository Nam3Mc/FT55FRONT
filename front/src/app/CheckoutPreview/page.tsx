/* eslint-disable @next/next/no-img-element */
"use client";
const CheckoutPreview = () => {
  const handlePayPalRedirect = () => {
    const id = "cec8bb88-2bc1-44e6-84a0-31dd90e4f50c";
    const link =
      "https://www.sandbox.paypal.com/checkoutnow?token=3FP69142YX601230R";

    localStorage.setItem("paypalPaymentId", id);
    window.location.href = link;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenido principal */}
      <main className="flex-grow">
        <div className="flex flex-col md:flex-row justify-between p-6 bg-silk text-black">
          {/* Contenido izquierdo */}
          <div className="flex-1 pr-6">
            <h1 className="text-2xl font-bold mb-4">Confirmá y pagá</h1>
            <div className="bg-pearl p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-lg font-semibold mb-4">Tu viaje</h2>
              <div className="flex justify-between mb-4">
                <span>Fechas</span>
              </div>
              <p className="mb-4">14 – 19 de ene. de 2025</p>
              <div className="flex justify-between mb-4">
                <span>Huéspedes</span>
              </div>
              <p>1 viajero</p>
            </div>
          </div>

          {/* Contenido derecho */}
          <div className="w-full md:w-1/3 bg-pearl p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <img
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
            <div className="flex justify-between mb-2">
              <span>$100,00 USD por 5 noches</span>
              <span className="font-semibold">$500,00 USD</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tarifa de limpieza</span>
              <span className="font-semibold">$20,00 USD</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tarifa por servicio de Renta Facil</span>
              <span className="font-semibold">$73,41 USD</span>
            </div>

            <hr className="border-marble my-4" />
            <div className="flex justify-between items-center text-lg font-bold mb-4">
              <span>Total (USD)</span>
              <span>$593,41 USD</span>
            </div>
            <button
              onClick={handlePayPalRedirect}
              className="w-full py-3 bg-champagne text-pearl font-bold rounded-lg hover:bg-velvet hover:text-champagne transition"
            >
              Pagar con PayPal
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default CheckoutPreview;
