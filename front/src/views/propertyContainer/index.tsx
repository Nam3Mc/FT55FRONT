"use client";

import CardList from "@/components/cardList";
import { IProperty } from "@/interfaces/IProperty";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading/loading";
import { FilterProperties, IFilters } from "@/api/FilterAPI";
import HeroFilterExtend from "@/components/heroFilter/heroFilter";

interface PropertyContainerProps {
  searchParams: IFilters;
}

const PropertyContainer: React.FC<PropertyContainerProps> = ({
  searchParams,
}) => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //console.log("Recibiendo searchParams en PropertyContainer:", searchParams);
    //console.log("recibiendo fechas:", searchParams.checkIn);
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const products = (await FilterProperties(searchParams)) as IProperty[];
        //console.log(products);

        const transformedProperties = products.map((property) => ({
          ...property,
          photos: property.image_?.map((img) => img.url) || [],
        }));
        //console.log("estas son las fotos:", products[0].photos);
        setProperties(transformedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-5xl mx-auto mb-12 border">
          <HeroFilterExtend params={searchParams} />
        </div>

        {properties.length === 0 ? (
          <p className="text-center text-gray-600">
            No se encontraron propiedades que coincidan con tu búsqueda.
          </p>
        ) : (
          <CardList properties={properties} />
        )}
      </div>
    </div>
  );
};

export default PropertyContainer;
