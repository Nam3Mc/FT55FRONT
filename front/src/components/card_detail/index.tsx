"use client";

// next
import Image from "next/image";

// interfaces
import { IProperty } from "@/interfaces/IProperty";
import { user } from "@/helpers/data";

// component
import ImageCarousel from "../image_carousel";

interface IPropsDetail {
  property: IProperty;
  owner?: user;
}

export const CardDetail: React.FC<IPropsDetail> = ({ property, owner }) => {

  const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/61/61205.png"; // URL de imagen predeterminada
  const imageSrc =
    owner?.photo && owner.photo.trim() ? owner.photo : defaultPhoto;

  return (
    <div className="flex flex-col md:flex-row border-2 border-marble p-4 rounded-lg shadow-md mb-6 lg:mx-40">
      {/* Imagen con boton corazón */}
      <div className="relative md:w-1/2">
        <ImageCarousel {...property} />
      </div>

      {/* Contenido */}
      <div className="md:w-1/2 w-full p-4 bg-pearl">
        <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
        <h3 className="text-lg font-medium mb-2">
          {property.city} / {property.state}
        </h3>
        <h4>{property.country}</h4>
        <p className="text-gray-600 mb-2">
          {property.capacity} Huéspedes | {property.bedrooms} Dormitorios |{" "}
          {property.bathrooms} Baños
        </p>
        <p className="text-lg font-bold mb-2">${property.price} por noche</p>
        <div className="flex">
          <i className="fi fi-ss-star text-yellow-500"></i>
          <p>{property.rating}</p>
        </div>
        <div className="flex items-center mt-10">
          {owner?.photo && (
            <Image
              src={
                imageSrc ||
                "https://cdn-icons-png.flaticon.com/512/61/61205.png"
              }
              alt="Propietario"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full mr-2"
            />
          )}

          <span className="text-gray-800">
            {owner?.name} {owner?.lastName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
