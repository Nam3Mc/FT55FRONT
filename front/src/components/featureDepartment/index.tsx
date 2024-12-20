// react
import React, { useRef } from "react";


import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent
} from "@/components/ui/carousel";

import { IProperty } from "@/interfaces/IProperty";
import CardHome from "../card_home";

interface IFeatureDepartmentsProps {
  properties: IProperty[];
}

export const FeatureDepartments: React.FC<IFeatureDepartmentsProps> = ({properties}) => {

  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* <h2 className="mb-6 text-2xl text-center font-semibold md:text-3xl">
          Departamentos
        </h2> */}
        <Carousel className="w-full" plugins={[plugin.current]}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {properties && properties.map((property: IProperty) => (
              <CardHome {...property} key={property.id}/>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default FeatureDepartments