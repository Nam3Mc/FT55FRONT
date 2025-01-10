import { IProperty } from "@/interfaces/IProperty";
import React from "react";
import ImageCarousel from "../image_carousel";

const CardFavs: React.FC<IProperty> = (property) => {
  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <ImageCarousel/>

      <div className="p-4">
        {/* Título 1 */}
        <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>

        {/* Título 2 */}
        <h3 className="text-lg font-medium text-gray-600 mt-1">
          {property.city}, {property.state}
        </h3>

        {/* Descripción */}
        <p className="text-gray-500 mt-2">
          {property.capacity} Huéspedes - {property.bedrooms} Habitaciones
        </p>

        {/* Precio */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-green-600">
            ${property.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardFavs;
