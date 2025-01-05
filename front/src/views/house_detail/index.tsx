// react
import React from 'react';

import ContainerDetail from '@/components/container_detail';
// import { productsToPreLoad } from '@/helpers/data';
import { getPropertyById, getPropertyOwner } from '@/api/PropertyAPI';


export const HouseDetail: React.FC<{params:{id:string}}> = async({params}) => {
  const house = await getPropertyById(params.id)
  
  const property = {...house,
    photos: house.image_?.map((img) => img.url) || [],
  }
  


  if (!property) {
    return <div>Error: Propiedad no encontrada</div>;
  }
  const ownerId = property.account_?.id;

  let owner = null;
  if (ownerId) {
    owner = await getPropertyOwner(ownerId);
    console.log(owner);
    
  } else {
    console.warn("No account ID found in property data.");
  }
  console.log(owner?.user_);
  
  return <ContainerDetail property={property} owner={owner?.user_} />;
  

}

export default HouseDetail