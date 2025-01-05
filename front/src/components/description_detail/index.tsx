// react
import { IProperty } from '@/interfaces/IProperty';
import React from 'react';
import AmenitiesList from '../amenities_list';


export const DescriptionDetail: React.FC<IProperty> = (property) => {
return (
   <div className="p-8 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Acerca de este alojamiento</h3>
        <p className="text-gray-600 mb-4">
        {property.description}
        </p>
        <h3 className="text-xl font-bold mb-2">¿Qué ofrece este lugar?</h3>
        <AmenitiesList amenities={property.amenities_} hasMinor={property.hasMinor} pets={property.pets}/>
       
      </div>
)
}

export default DescriptionDetail