import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
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
            Conecta con más personas...
          </p>
          <h2 className="text-4xl text-white font-bold mb-4 text-center mt-20">
            ¿Eres propietario?
          </h2>
          <h1 className="text-4xl text-white font-bold mb-8 text-center">
            ¡Publica tu propiedad para alquiler con nosotros!
          </h1>
          <p className="text-xl text-white mb-8 text-center">
            Alcanza a más personas interesadas en tu propiedad
            <br />
            Publica ahora y maximiza tus oportunidades!
          </p>
        </div>
      </section>
    </div>
  );
}
