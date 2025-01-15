"use client";
import ImageCarousel from "../image_carousel";
import { IProperty } from "@/interfaces/IProperty";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";
import Link from "next/link";

export const CardProperties: React.FC<IProperty> = (property: IProperty) => {
  return (
    <CarouselItem
      key={property.id}
      className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
    >
      <div className="overflow-visible p-1">
        <Card className="transform bg-gradient-to-b from-[#4d5665] via-[#374152] to-[#374152]">
          <CardContent className="p-0">
            <div className="relative">
              <ImageCarousel {...property} />
            </div>
            <Link href={`/house/${property.id}`} key={property.id} passHref>
              <div className="flex h-[250px] flex-col justify-between rounded-b-lg bg-pearl p-4">
                <h3 className="line-clamp-1 text-lg font-bold hover:text-[#29b6f6]">
                  {property.name}
                </h3>
                <p className="mt-2 mb-2 text-lg font-bold hover:text-[#29b6f6]">
                  {property.city} - {property.state}
                </p>
                <h4>{property.country}</h4>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <span className="text-sm font-bold">Habitaciones</span>
                  <p className="text-sm font-bold mb-2">{property.bedrooms}</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <span className="text-sm font-bold">Huéspedes</span>
                  <p className="text-sm font-bold mb-2">{property.capacity}</p>
                </div>
                <span className="text-xl text-[#29b6f6] font-bold">
                  ${property.price} Por noche
                </span>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
export default CardProperties;
