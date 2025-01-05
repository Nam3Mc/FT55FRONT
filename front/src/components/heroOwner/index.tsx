import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function HeroOwner() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative h-[700px] w-full">
            <Image
              src="/banner-owner.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="container relative mx-auto px-4 pb-24 pt-10">
          <p className="text-xl text-white mb-8 text-center">
            Publica tu propiedad
          </p>
          <h2 className="text-4xl text-white font-bold mb-4 text-center">
            ¿Eres propietario?
          </h2>
          <h1 className="text-4xl text-white font-bold mb-4 text-center">
            ¡Publica tu propieda para alquiler con nosotros!
          </h1>

          <div className="flex flex-col justify-center md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full mt-14 md:w-1/5 px-3">
              <Button
                type="submit"
                className="w-full h-10 font-bold text-lg hover:bg-white hover:text-black"
              >
                Registrate
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
