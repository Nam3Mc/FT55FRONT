"use client";
// react
import React from "react"

// interface
import { IProperty } from "@/interfaces/IProperty";

// next
import Link from "next/link";

// componentsUI
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import ImageCarousel from "../../image_carousel";

export const CardHome: React.FC<IProperty> = (property: IProperty) => {

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
                </div>
                <Link href={`/house/${property.id}`} key={property.id} passHref>
                  <div className="flex h-[300px] flex-col justify-between rounded-b-lg bg-pearl p-4">
                    <h3 className="line-clamp-1 text-base font-bold">
                      {property.name}
                    </h3>
                    <p className="mt-2 mb-2 text-lg font-bold">
                      {property.city} - {property.state}
                    </p>
                    <h4 className="text-sm">{property.country}</h4>
                    <p className="text-gray-600 mb-1 text-sm line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <span className="text-xs font-bold">
                        Habitaciones
                      </span>
                      <p className="text-sm font-bold mb-2">
                        {property.bedrooms}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                      <span className="text-xs font-bold">Huéspedes</span>
                      <p className="text-xs font-bold mb-2">
                        {property.capacity}
                      </p>
                    </div>
                    <span className="text-lg text-[#239b56] font-bold">
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
