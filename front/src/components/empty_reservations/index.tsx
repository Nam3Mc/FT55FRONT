import Image from "next/image";
import emptyImage from "@/assets/emptybox.png"
import React from "react";
import Link from "next/link";

export const EmptyReservations: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 mt-6">
        <Image
          src={emptyImage}
          alt="No favoritos"
          className="mb-6"
          width={200}
          height={200}
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Aún no tienes reservas hechas
        </h2>
        <p className="text-gray-500 mb-6">
          ¡Explora nuestras propiedades y reserva las que más te gusten para
          verlas aquí! 
        </p>
        <Link href="/"> 
            <button className="px-6 py-3 bg-silk text-velvet rounded-lg hover:bg-champagne hover:text-velvet transition"
            >
                Explorar propiedades
            </button>
        </Link>
      </div>
    )
}

export default EmptyReservations;