"use client";

import React, { useState } from "react";
import Image from "next/image";
import casadef from "@/assets/casadef.png";

interface CarouselProps {
  photos?: string[]; 
  image_?: { id: string; url: string }[]; 
}

export const ImageCarousel: React.FC<CarouselProps> = ({ photos }) => {
  const defaultImage = casadef; // Imagen predeterminada
  const [currentIndex, setCurrentIndex] = useState(0);

  // Manejo de imágenes válidas o uso de imagen por defecto
  const validPhotos = photos && photos.length > 0 ? photos : [defaultImage];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? validPhotos.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === validPhotos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg bg-gray-100">
      {/* Imagen actual */}
      <Image
        src={validPhotos[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        fill
        className="transition-transform duration-500 ease-in-out object-contain"
      />

      {/* Botón anterior */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-transparent py-2 px-2 rounded-full shadow-md hover:scale-110 z-10"
      >
        <i className="fi fi-rr-angle-left"></i>
      </button>

      {/* Botón siguiente */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent py-2 px-2 rounded-full shadow-md hover:scale-110 z-10"
      >
        <i className="fi fi-rr-angle-right"></i>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {validPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-silk" : "bg-velvet"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;

