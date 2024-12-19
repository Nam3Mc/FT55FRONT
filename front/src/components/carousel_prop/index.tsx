"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface CarouselProps {
  photos: string[];
}

export const ImageCarousel: React.FC<CarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg">
      {/* Imagen actual */}
      <Image
        src={photos[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 ease-in-out"
      />

      {/* Botón anterior */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-transparent py-80 px-2 shadow-md hover:scale-110 z-10"
      >
        <i className="fi fi-rr-angle-left"></i>
      </button>

      {/* Botón siguiente */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent py-80 px-2 rounded-full shadow-md hover:scale-110 z-10"
      >
        <i className="fi fi-rr-angle-right"></i>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
