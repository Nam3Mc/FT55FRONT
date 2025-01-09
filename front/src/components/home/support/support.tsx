"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Support() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-4 py-8 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 sm:py-12 lg:px-8">
          <h2 className="flex justify-center items-center mb-12 text-center text-2xl font-bold text-black dark:text-white sm:text-left sm:text-3xl">
            Preguntas frecuentes
          </h2>
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl text-sky-600">
                Se puede reservar directamente desde la web?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-lg">
                Si, puedes hacer tu reserva directamente desde la web, consulta
                fechas disponibles y reserva.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl text-sky-600">
                Las fechas de disponibilidad y precios estan actualizados?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-lg">
                Trabajamos arduamente para que así sea, pero, como los precios
                están en dólares, pueden variar. Así como también las reservas
                de último minuto. Siempre es mejor consultar para que podamos
                asesorarte.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl text-sky-600">
                Los niños cuentan como adultos?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-lg">
                Sí, pero los menores de tres años no, porque podrían dormir con
                sus padres, también hay que mencionarlos en la consulta.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl text-sky-600">
                Cuales son las políticas de cancelación?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-lg">
                Las políticas de cancelación varían según la propiedad. Consulte
                antes de reservar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-xl text-sky-600">
                Dónde puedo ver las ubicaciones de las propiedades?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-lg">
                En cada propiedad figura un google maps de la ubicación . La
                dirección exacta, por cuestiones de seguridad, sólo se enviará
                en el voucher de reserva, una vez concretada.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
