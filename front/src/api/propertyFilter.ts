// import { IProperty } from "@/interfaces/IProperty";

// export interface SearchParams {
//   checkIn?: string;
//   checkOut?: string;
//   capacity?: string;
//   state?: string;
//   type?: string;
// }

// export async function getPropertiesFilter(
//   searchParams: SearchParams
// ): Promise<IProperty[]> {
//   const queryString = new URLSearchParams({
//     // ...(searchParams.checkIn && { checkIn: searchParams.checkIn }),
//     ...(searchParams.type && { type: searchParams.type }),
//     ...(searchParams.capacity && { capacity: searchParams.capacity }),
//     ...(searchParams.state && { state: searchParams.state }),
//   }).toString();
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/properties?${queryString}`,
//     { cache: "no-store" }
//   );

//   if (!response.ok) {
//     throw new Error("fallo la peticion de propiedades");
//   }
//   return response.json();
// }

//PRUEBA 2

// import { IProperty } from "@/interfaces/IProperty";

// export interface SearchParams {
//   checkIn?: string;
//   checkOut?: string;
//   capacity?: string;
//   state?: string;
//   type?: string;
// }

// export async function getPropertyFilter(
//   searchParams?: SearchParams
// ): Promise<IProperty[]> {
//   const queryString = searchParams
//     ? new URLSearchParams(
//         Object.entries(searchParams).filter(([_, v]) => v != null) as [
//           string,
//           string
//         ][]
//       ).toString()
//     : "";

//   const url = `${process.env.NEXT_PUBLIC_API_URL}/properties${
//     queryString ? `?${queryString}` : ""
//   }`;

//   const response = await fetch(url, { cache: "no-store" });

//   if (!response.ok) {
//     throw new Error("Failed to fetch properties");
//   }

//   return response.json();
// }

//PRUEBA 3

import { IProperty } from "@/interfaces/IProperty";
import { getPropertyDB } from "./PropertyAPI";

export interface SearchParams {
  checkIn?: string;
  checkOut?: string;
  capacity?: string;
  state?: string;
  type?: string;
}

export async function filterProperties(
  searchParams: SearchParams
): Promise<IProperty[]> {
  // Obtener todas las propiedades
  const allProperties = await getPropertyDB();

  // Filtrar las propiedades basadas en los parámetros de búsqueda
  const filteredProperties = allProperties.filter((property) => {
    let isMatch = true;

    if (searchParams.state && property.state) {
      isMatch =
        isMatch &&
        property.state.toLowerCase().includes(searchParams.state.toLowerCase());
    }

    if (searchParams.capacity && property.capacity) {
      isMatch =
        isMatch && property.capacity === parseInt(searchParams.capacity);
    }
    if (searchParams.type && property.type) {
      isMatch =
        isMatch &&
        property.type
          .toLowerCase()
          .includes(searchParams.type.toLocaleLowerCase());
    }

    // Aquí se agrega la lógica de filtrado para checkIn y checkOut
    // Por ejemplo, si se tiene un array de fechas disponibles en cada propiedad:
    // if (
    //   searchParams.checkIn &&
    //   searchParams.checkOut &&
    //   property.availableDates
    // ) {
    //   const checkIn = new Date(searchParams.checkIn);
    //   const checkOut = new Date(searchParams.checkOut);
    //   isMatch =
    //     isMatch &&
    //     property.availableDates.some((date) => {
    //       const availableDate = new Date(date);
    //       return availableDate >= checkIn && availableDate <= checkOut;
    //     });
    // }

    return isMatch;
  });

  return filteredProperties;
}
