"use client";

<<<<<<< HEAD
import React, { useEffect, useState } from "react"
// import FeatureDepartments from "../featureDepartment/featureDepartment";
import { getPropertyDB } from "@/api/PropertyAPI";
import { IProperty } from "@/interfaces/IProperty";
// import FeatureHouses from "../featureHouse/featureHouse";
=======
import React, { useEffect, useState } from "react";
import FeatureDepartments from "../../../components/featureDepartment/index";
import { getPropertyDB } from "@/api/PropertyAPI";
import { IProperty } from "@/interfaces/IProperty";
import FeatureHouses from "../../../components/featureHouse/index";
>>>>>>> 4997db48f9666c8adfa8335dfe31f16ca5a3af9e

export const HomeContainer: React.FC = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesData = await getPropertyDB();

      const transformedProperties = propertiesData.map((property) => ({
        ...property,
        photos: property.image_?.map((img) => img.url) || [],
      }));

      setProperties(transformedProperties);
    };

    fetchProperties();
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <FeatureDepartments properties={properties} />
        <FeatureHouses properties={properties} />
      </div>
    </div>
  );
};

<<<<<<< HEAD
    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                {/* <FeatureDepartments properties={properties}/> */}
                {/* <FeatureHouses properties={properties}/> */}
            </div>
        </div>
    )
}

export default HomeContainer
=======
export default HomeContainer;
>>>>>>> 4997db48f9666c8adfa8335dfe31f16ca5a3af9e
