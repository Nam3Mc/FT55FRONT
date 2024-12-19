"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] via-[#1a2332] to-black text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden pt-5">
          <div className="absolute inset-0 z-0">
            <div className="h-[700px] w-full">
              <Image
                src="/fondo-about.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
              />
              <div
                className="absolute inset-0 bg-blue-600 bg-opacity-50"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div className="container relative mx-auto px-4 pb-24 pt-40">
            <div className="max-w-2xl">
              <h1 className="mb-16 text-center text-7xl font-extrabold uppercase leading-8 tracking-wider">
                RENTAFACIL
              </h1>
              <h1 className="mb-6 text-sm font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Tu casa en un click!
              </h1>
              <p className="mb-8 max-w-lg text-lg font-normal leading-relaxed text-gray-300 md:text-xl">
                Un lugar digital y cómodo donde los sueños se hacen realidad.
                Somos un portal inmobiliario que pone al usuario en el centro de
                atención, se adapta a los cambios y mira hacia el futuro.
                Iniciamos nuestra andadura en Colombia en el 2009. Estamos
                presentes en varios paises de Latam, con más de 150K visitas al
                mes. ¡Te mostramos un sinfín de oportunidades para encontrar tu
                lugar para una estadía maravillosa!
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex max-w-xl flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">Por que elegirnos?</h2>
            <p className="text-justify text-lg text-muted-foreground">
              1. Amplia Selección de Propiedades: Ofrecemos una gran variedad de
              casas, departamentos y habitaciones que se ajustan a tus
              preferencias y presupuesto.
            </p>
            <p className="mt-4 text-justify text-lg text-muted-foreground">
              2. Herramientas Interactivas: Con Google Maps integrado, puedes
              explorar fácilmente la ubicación de las propiedades y descubrir
              servicios cercanos.
            </p>
            <p className="mt-4 text-justify text-lg text-muted-foreground">
              3. Proceso Simplificado: Desde la publicación de propiedades hasta
              las reservas seguras, nuestra plataforma garantiza una experiencia
              de alquiler confiable y eficiente.
            </p>
            <p className="mt-4 text-justify text-lg text-muted-foreground">
              4. Plataforma Confiable: Todos los propietarios son verificados, y
              nuestro equipo trabaja para mantener los más altos estándares de
              calidad y seguridad.
            </p>
            <p className="mt-4 text-justify text-lg text-muted-foreground">
              5. Enfoque en el Cliente: Ya sea que estés alquilando o publicando
              una propiedad, estamos aquí para apoyarte en cada paso del camino.
            </p>
          </div>
          <div className="relative h-[300px] w-full max-w-[300px] overflow-hidden">
            <div className="absolute inset-0 overflow-hidden rounded-bl-[40%] rounded-br-3xl rounded-tl-3xl rounded-tr-[40%] bg-black">
              <Image
                src="/about1.jpeg"
                alt="rentafacil"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
