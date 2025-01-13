"use client";

import CardList from "@/components/cardList";
import { IProperty } from "@/interfaces/IProperty";
//import { filterProperties, SearchParams } from "@/api/propertyFilter";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading/loading";
//import { getPropertyDB } from "@/api/PropertyAPI";
import { FilterProperties, IFilters } from "@/api/FilterAPI";
import { getPropertyDB } from "@/api/PropertyAPI";

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
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const products = (await FilterProperties(searchParams)) as IProperty[];
        //console.log(products);

        const transformedProperties = products.map((property) => ({
          ...property,
          photos: property.image_?.map((img) => img.url) || [],
        }));

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
