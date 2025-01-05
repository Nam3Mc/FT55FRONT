import { IProperty } from "@/interfaces/IProperty";
import React from "react";

const AmenitiesList: React.FC<{ amenities: IProperty['amenities_']; hasMinor: boolean; pets: boolean }> = ({ amenities, hasMinor, pets }) => {
    return (
        <ul className="list-disc list-inside mb-4">
            {/* Amenidades */}
            {amenities && (
                <>
                    {amenities.wifi && <li>WiFi</li>}
                    {amenities.tv && <li>Televisión</li>}
                    {amenities.airConditioning && <li>Aire acondicionado</li>}
                    {amenities.piscina && <li>Piscina</li>}
                    {amenities.parqueadero && <li>Parqueadero</li>}
                    {amenities.cocina && <li>Cocina</li>}
                </>
            )}
            {/* Permisos */}
            {hasMinor && <li>Permite menores</li>}
            {pets && <li>Permite mascotas</li>}
        </ul>
    );
};

export default AmenitiesList;
