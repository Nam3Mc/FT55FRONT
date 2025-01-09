"use client";
import { getPropertyDB } from "@/api/PropertyAPI";
import CardList from "@/components/cardList";
import { IProperty } from "@/interfaces/IProperty";
import React, { useEffect, useState } from "react";

const PropertyContainer: React.FC = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const products = await getPropertyDB();

      const transformedProperties = products.map((property) => ({
        ...property,
        photos: property.image_?.map((img) => img.url) || [],
      }));

      setProperties(transformedProperties);
    };

    fetchProperties();
  }, []);
  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <CardList properties={properties} />
      </div>
    </div>
  );
};

export default PropertyContainer;
