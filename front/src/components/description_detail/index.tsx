// react
import { IProduct } from '@/interfaces/IProduct';
import React from 'react';


export const DescriptionDetail: React.FC<IProduct> = (product) => {
return (
   <div className="p-8 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Acerca de este alojamiento</h3>
        <p className="text-gray-600 mb-4">
        {product.description}
        </p>
        <h3 className="text-xl font-bold mb-2">¿Qué ofrece este lugar?</h3>
        <ul className="list-disc list-inside mb-4">
          <li>WiFi</li>
          <li>Estacionamiento en el lugar</li>
          <li>Cocina</li>
          <li>Permite mascotas</li>
          <li>Permite menores</li>
        </ul>
       
      </div>
)
}

export default DescriptionDetail