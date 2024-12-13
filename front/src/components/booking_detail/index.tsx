"use client";

import React, { useState } from "react";

// libreria del calendario
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const BookingDetail: React.FC = () => {

  const [showCalendar, setShowCalendar] = useState(false);

  const [showTravelers, setShowTravelers] = useState(false);

  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
    key: string;
  }>({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });
  
  

  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    babies: 0,
    pets: false,
  });

  // prueba
  const huespedes = 4;
  const precio = 120;


  const calculateNights = () => {
    if (dateRange.startDate && dateRange.endDate) {
      const diffTime = dateRange.endDate.getTime() - dateRange.startDate.getTime();
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir ms a días
      return nights;
    }
    return 0;
  };

  const nights = calculateNights();
  const totalPrecio = nights * precio;
  const discountPerWeek = totalPrecio * 0.05;
  const finalpriceWD = totalPrecio - discountPerWeek;

  const handleDateChange = (ranges: any) => {
    setDateRange(ranges.selection);
  };

  
  const updateTravelers = (key: "adults" | "children" | "babies", value: number) => {
    const total = value + (key === "adults" ? travelers.children : travelers.adults);
    if (total <= huespedes) {
      setTravelers({ ...travelers, [key]: value });
    }
  };

  
  const travelersText = `${travelers.adults} Adulto${travelers.adults > 1 ? "s" : ""}${
    travelers.children > 0 ? `, ${travelers.children} Niño${travelers.children > 1 ? "s" : ""}` : ""
  }${travelers.babies > 0 ? `, ${travelers.babies} Bebe${travelers.babies > 1 ? "s" : "" }`: ""}`;

  const datesValid = dateRange.startDate && dateRange.endDate && dateRange.endDate > dateRange.startDate;

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto bg-marble">
      {/* precio por noche */}
      { datesValid ? (
        <div className="flex items-center space-x-2 mb-4 p-2">
          <h1 className="text-xl font-extrabold">${precio}USD</h1>
          <p className="text-gray-500">por noche</p>
        </div>
        ) : (<></>)}

      {/* Título */}
      <h2 className="text-xl font-semibold mb-4">Reserva tu estadía</h2>

      {/* Input de Fechas */}
      <div className="mb-4 relative">
        <label className="block text-gray-600 font-medium mb-2">¿Cuándo?</label>
        <label>Desde</label>
        <input
          type="text"
          readOnly
          value={dateRange.startDate ? dateRange.startDate.toLocaleDateString() : "Elegí tu fecha"}
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne cursor-pointer"
        />
        <label>Hasta</label>
        <input
          type="text"
          readOnly
          value={dateRange.endDate ? dateRange.endDate.toLocaleDateString() : "Elegí tu fecha"}
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne cursor-pointer"
        />
        {showCalendar && (
          <div className="absolute z-10 bg-white shadow-md mt-2">
            <DateRange
              ranges={[dateRange]}
              onChange={handleDateChange}
              minDate={new Date()}
              rangeColors={["#222D52"]}
              showDateDisplay={false}
            />
          </div>
        )}
      </div>

      {/* Input de Viajeros */}
      <div className="mb-4 relative">
        <label className="block text-gray-600 font-medium mb-2">Viajeros</label>
        <input
          type="text"
          readOnly
          value={travelersText}
          onClick={() => setShowTravelers(!showTravelers)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        />
        {showTravelers && (
          <div className="absolute z-10 bg-white shadow-md mt-2 p-4 border rounded-md">
            <div className="mb-2">
              <label className="block text-gray-600 font-medium mb-1">Adultos (Edad: más de 13 años)</label>
              <input
                type="number"
                min="1"
                max={huespedes}
                value={travelers.adults}
                onChange={(e) => updateTravelers("adults", Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-600 font-medium mb-1">Niños (de 2 a 12 años)</label>
              <input
                type="number"
                min="0"
                max={huespedes - travelers.adults}
                value={travelers.children}
                onChange={(e) => updateTravelers("children", Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-600 font-medium mb-1">Bebes(menos de 2 años)</label>
              <input
                type="number"
                min="0"
                max="4"
                value={travelers.babies}
                onChange={(e) => updateTravelers("babies", Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-2 flex items-center">
              <label className="block text-gray-600 font-medium mr-4">Mascotas</label>
              <button
                onClick={() => setTravelers({ ...travelers, pets: !travelers.pets })}
                className={`px-3 py-1 rounded-full ${
                  travelers.pets ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {travelers.pets ? "Sí" : "No"}
              </button>
            </div>
            <p className="text-gray-600 text-sm">
              Este alojamiento permite hasta {huespedes} huéspedes.
            </p>
          </div>
        )}
      </div>

      {datesValid ? (
        <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">${precio} por {nights} noches</h3>
            <h3>${totalPrecio.toFixed(2)}</h3>
          </div>
          {nights >= 7 ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Descuento por estadía semanal</h3>
                <h3 className="text-green-600">-${discountPerWeek.toFixed(2)}</h3>
              </div>

              <hr className="border-t border-gray-300 my-4" />

              <div className="flex justify-between items-center mb-4">
                <h2  className="font-semibold">Reserva total</h2>
                <h2>${finalpriceWD.toFixed(2)}</h2>
              </div>

              <button className="bg-champagne text-pearl py-2 px-4 mb-4 rounded-lg hover:bg-velvet hover:scale-110">
                Reserva
              </button>
            </div>
            ) : (
              <div>
                <hr className="border-t border-gray-300 my-4" />

                <div className="flex justify-between items-center mb-4">
                  <h2  className="font-semibold">Reserva total</h2>
                  <h2>${totalPrecio.toFixed(2)}</h2>
                </div>
                <button className="bg-champagne text-pearl py-2 px-4 mb-4 rounded-lg hover:bg-velvet hover:scale-110">
                  Reserva
                </button>
              </div>
            )}

           

        </div>
        ): (
        <button className="bg-champagne text-pearl py-2 px-4 rounded-lg hover:bg-velvet hover:scale-110">
          Consulta disponibilidad
        </button>
      )}
      
    </div>
  );
};

export default BookingDetail;

