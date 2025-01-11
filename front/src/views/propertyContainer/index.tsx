// "use client";
// import { getPropertyDB } from "@/api/PropertyAPI";
// import CardList from "@/components/cardList";
// import { IProperty } from "@/interfaces/IProperty";
// import React, { useEffect, useState } from "react";

// const PropertyContainer: React.FC = () => {
//   const [properties, setProperties] = useState<IProperty[]>([]);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       const products = await getPropertyDB();

//       const transformedProperties = products.map((property) => ({
//         ...property,
//         photos: property.image_?.map((img) => img.url) || [],
//       }));

//       setProperties(transformedProperties);
//     };

//     fetchProperties();
//   }, []);
//   return (
//     <div className="py-4">
//       <div className="container mx-auto px-4">
//         <CardList properties={properties} />
//       </div>
//     </div>
//   );
// };

// export default PropertyContainer;

//prueba 1 de filtro

"use client";

import CardList from "@/components/cardList";
import { IProperty } from "@/interfaces/IProperty";
import { filterProperties, SearchParams } from "@/api/propertyFilter";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading/loading";
import { getPropertyDB } from "@/api/PropertyAPI";

interface PropertyContainerProps {
  searchParams: SearchParams;
}

const PropertyContainer: React.FC<PropertyContainerProps> = ({
  searchParams,
}) => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Recibiendo searchParams en PropertyContainer:", searchParams);
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        //const products = await getPropertiesFilter(searchParams);
        // const products = await getPropertyDB();
        const products = await filterProperties(searchParams);
        console.log(products);

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
