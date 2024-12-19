// react
import React from 'react';

import ContainerDetail from '@/components/container_detail';
import { productsToPreLoad } from '@/helpers/data';

export const Detail: React.FC<{params:{id:string}}> = async({params}) => {
  const product = await productsToPreLoad.find((item) => item.id === Number(params.id))

  if (!product) {
    return <div>Error: Propiedad no encontrada</div>;
  }

return (
  <ContainerDetail {...product}/>
)
}

export default Detail