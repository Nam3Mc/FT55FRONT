"use client";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { productsToPreLoad } from "@/helpers/data";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function FeatureDepartments() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl text-center font-semibold md:text-3xl">
          Departamentos
        </h2>
        <Carousel className="w-full" plugins={[plugin.current]}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {productsToPreLoad.map((property) => (
              <CarouselItem
                key={property.id}
                className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <Link href={`/house/${property.id}`} key={property.id} passHref>
                  <div className="overflow-visible p-1">
                    <Card className="transform bg-gradient-to-b from-[#4d5665] via-[#374152] to-[#374152] transition-transform duration-300 hover:scale-105">
                      <CardContent className="p-0">
                        <div className="relative">
                          <Image
                            src={property.photos[0]}
                            alt={property.title}
                            className="h-60 w-full rounded-t-lg object-cover"
                            width={300}
                            height={400}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          >
                            <Heart />
                          </Button>
                        </div>
                        <div className="flex h-[250px] flex-col justify-between rounded-b-lg bg-white p-4">
                          <h3 className="line-clamp-1 text-lg font-bold">
                            {property.title}
                          </h3>
                          <p className="mt-2 mb-2 text-lg font-bold">
                            {property.city} - {property.state}
                          </p>
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
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
