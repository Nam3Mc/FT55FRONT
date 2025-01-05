import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { productsToPreLoad } from "@/helpers/data";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function FeatureProperties() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Propiedades Destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsToPreLoad.map((property) => (
            <Card key={property.id}>
              <div className="relative">
                <Image
                  src={property.image}
                  alt={property.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart />
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2 hover:text-sky-500">
                  {property.title}
                </h3>
                <p className="text-gray-800 font-semibold mb-2 hover:text-sky-500">
                  {property.location}
                </p>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <span>Habitaciones</span>
                  <p className="text-gray-600 mb-2">{property.rooms}</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <span>Huéspedes</span>
                  <p className="text-gray-600 mb-2">{property.guests}</p>
                </div>

                <Badge className="text-xl" variant="secondary">
                  ${property.price}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
