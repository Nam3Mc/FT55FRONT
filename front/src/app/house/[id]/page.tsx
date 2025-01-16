// import React from "react";
// import ContainerDetail from "@/components/container_detail";
// import { getPropertyById, getPropertyOwner } from "@/api/PropertyAPI";

// // El componente de servidor que obtiene los datos
// export default async function HouseDetail({ params }: { params: { id: string } }) {
//   const { id } = params;

//   // Obtención de la propiedad por ID
//   const house = await getPropertyById(id);

//   if (!house) {
//     return <div>Error: Propiedad no encontrada</div>;
//   }

//   // Construcción del objeto propiedad
//   const property = {
//     ...house,
//     photos: house.image_?.map((img) => img.url) || [],
//   };

//   const ownerId = property.account_?.id;
//   let owner = null;
//   if (ownerId) {
//     owner = await getPropertyOwner(ownerId);
//   } else {
//     console.warn("No account ID found in property data.");
//   }

//   return <ContainerDetail property={property} owner={owner?.user_ || undefined} />;
// }

import React from "react";
import ContainerDetail from "@/components/container_detail";
import { getPropertyById, getPropertyOwner } from "@/api/PropertyAPI";

// Define PageProps according to the error message's hint
interface PageProps {
  params: Promise<{ id: string }>;
}

// The server component that fetches the data
export default async function HouseDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetching the property by ID
  const house = await getPropertyById(id);

  if (!house) {
    return <div>Error: Propiedad no encontrada</div>;
  }

  // Building the property object
  const property = {
    ...house,
    photos: house.image_?.map((img) => img.url) || [],
  };

  const ownerId = property.account_?.id;
  let owner = null;
  if (ownerId) {
    owner = await getPropertyOwner(ownerId);
  } else {
    console.warn("No account ID found in property data.");
  }

  return <ContainerDetail property={property} owner={owner?.user_ || undefined} />;
}