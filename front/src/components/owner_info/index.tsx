"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface OwnerInfoProps {
  id: string;
  name: string;
  lastName: string;
  email: string;
  nationality: string;
  employmentStatus: string;
  photo?: string; // Hacer que sea opcional
}

const OwnerInfo: React.FC<OwnerInfoProps> = ({ id, name, lastName, email, nationality, employmentStatus, photo }) => {
  const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/61/61205.png"; // URL de imagen predeterminada
  // const router = useRouter()
  // const handleContactOwner = () => {
  //   localStorage.setItem("OwnerId", JSON.stringify(id));
  //   // router.push("/message")
  // };

  // Determinar qué imagen usar
  const imageSrc = photo && photo.trim() ? photo : defaultPhoto;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 ml-8">Conocé al propietario</h1>
      <div className="flex items-center p-4 border rounded-lg shadow-md bg-silk max-w-md ml-8">
        {/* Foto del propietario */}
        <div className="w-24 h-24">
          <Image
            src={imageSrc}
            alt={`${name} ${lastName}`}
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-full border"
          />
        </div>

        {/* Información del propietario */}
        <div className="ml-4 flex-1">
          <h1 className="text-xl font-bold">{`${name} ${lastName}`}</h1>
          <p className="text-gray-600">Nacionalidad: {nationality}</p>
          <p className="text-gray-600">Estado laboral: {employmentStatus}</p>

          {/* Botón para contactar */}
          {/* <button
            onClick={handleContactOwner}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Escribile al propietario
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OwnerInfo;

