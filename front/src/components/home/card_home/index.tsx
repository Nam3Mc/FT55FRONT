"use client"
// react
import React, { useState } from "react"

// interface
import { IProperty } from "@/interfaces/IProperty";

// next
import Link from "next/link";

// componentsUI
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import ImageCarousel from "../../image_carousel";


export const CardHome: React.FC<IProperty> = (property: IProperty) => {

  const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };

    return (
        <CarouselItem
        key={property.id}
        className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
      >
          <div className="overflow-visible p-1">
            <Card className="transform bg-gradient-to-b from-[#4d5665] via-[#374152] to-[#374152] transition-transform duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="relative">
                <ImageCarousel {...property}/>
                {/* <button 
                  className="absolute hover:scale-110 top-3 right-3 z-10"
                  onClick={toggleFavorite}>
                    {!isFavorite ? <i className={`fi fi-rr-heart bg-white rounded-lg p-2 shadow-md`}></i> : <i className={`fi fi-sr-heart bg-white rounded-lg p-2 shadow-md text-red-500`}></i>}
                </button> */}
                </div>
                <Link href={`/house/${property.id}`} key={property.id} passHref>
                  <div className="flex h-[350px] flex-col justify-between rounded-b-lg bg-pearl p-4">
                    <h3 className="line-clamp-1 text-lg font-bold">
                      {property.name}
                    </h3>
                    <p className="mt-2 mb-2 text-lg font-bold">
                      {property.city} - {property.state}
                    </p>
                    <h4>{property.country}</h4>
                    <p className="text-gray-600 mb-2">
                      {property.description}
                    </p>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <span className="text-sm font-bold">
                        Habitaciones
                      </span>
                      <p className="text-sm font-bold mb-2">
                        {property.bedrooms}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <span className="text-sm font-bold">Huéspedes</span>
                      <p className="text-sm font-bold mb-2">
                        {property.capacity}
                      </p>
                    </div>
                    <span className="text-xl text-[#239b56] font-bold">
                      ${property.price} Por noche
                    </span>
                </div>
                </Link>
              </CardContent>
            </Card>
          </div>
      </CarouselItem>
    )
}

export default CardHome;