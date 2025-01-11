/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProperty } from "@/interfaces/IProperty";
import { IAccountUser } from "@/interfaces/IAccount";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPropertyDB = async (): Promise<IProperty[]> => {
<<<<<<< HEAD
    try {
        const res = await fetch(`https://rentafacil.onrender.com/property`, {
            next: { revalidate: 1200 }
        });
        console.log(res);
=======
  try {
    const res = await fetch(`${API_URL}/property`, {
      next: { revalidate: 1200 },
    });
    console.log(res);
>>>>>>> 949b99b87aea735380626dd426bd12ca74ffd109

    if (!res.ok) {
      throw new Error(
        `Fallo al realizar el fetch a Propiedades: ${res.status} ${res.statusText}`
      );
    }
    const properties: IProperty[] = await res.json();
    console.log(properties);

    return properties;
  } catch (error: any) {
    console.error("Error in getPropertyDB:", error.message || error);
    throw new Error(error);
  }
};

//prueba 1
// export const getPropertyDB = async (
//   searchParams?: SearchParams
// ): Promise<IProperty[]> => {
//   try {
//     let url = `${API_URL}/property`;
//     if (searchParams) {
//       const queryString = new URLSearchParams(
//         Object.entries(searchParams).filter(([_, v]) => v != null) as [
//           string,
//           string
//         ][]
//       ).toString();
//       if (queryString) {
//         url += `?${queryString}`;
//       }
//     }

//     const res = await fetch(url, {
//       next: { revalidate: 1200 },
//     });
//     console.log(res);

//     if (!res.ok) {
//       throw new Error(
//         `Fallo al realizar el fetch a Propiedades: ${res.status} ${res.statusText}`
//       );
//     }
//     const properties: IProperty[] = await res.json();
//     console.log(properties);

//     return properties;
//   } catch (error: any) {
//     console.error("Error in getPropertyDB:", error.message || error);
//     throw new Error(error);
//   }
// };

//prueba 2
// export const getPropertyDB = async (
//   searchParams?: SearchParams
// ): Promise<IProperty[]> => {
//   try {
//     let url = `${process.env.NEXT_PUBLIC_API_URL}/property`;

//     if (searchParams) {
//       const queryParams = new URLSearchParams();
//       Object.entries(searchParams).forEach(([key, value]) => {
//         if (value) queryParams.append(key, value);
//       });

//       const queryString = queryParams.toString();
//       if (queryString) {
//         url += `?${queryString}`;
//       }
//     }

//     console.log("Fetching from URL:", url); // Para depuración

//     const res = await fetch(url, {
//       next: { revalidate: 1200 },
//     });

//     if (!res.ok) {
//       throw new Error(
//         `Fallo al realizar el fetch a Propiedades: ${res.status} ${res.statusText}`
//       );
//     }

//     const properties: IProperty[] = await res.json();
//     console.log("Fetched properties:", properties); // Para depuración

//     return properties;
//   } catch (error: any) {
//     console.error("Error in getPropertyDB:", error.message || error);
//     throw new Error(error);
//   }
// };

export const getPropertyById = async (id: string): Promise<IProperty> => {
<<<<<<< HEAD
    try {
        const res = await fetch(`https://rentafacil.onrender.com/property/unique/${id}`, {
            next: { revalidate: 1200 }
        });
=======
  try {
    const res = await fetch(`${API_URL}/property/unique/${id}`, {
      next: { revalidate: 1200 },
    });
>>>>>>> 949b99b87aea735380626dd426bd12ca74ffd109

    if (!res.ok) {
      throw new Error(
        `Fallo al realizar el fetch a Propiedades por ID: ${res.status} ${res.statusText}`
      );
    }

    const property: IProperty[] = await res.json();
    console.log(property[0]);

    if (Array.isArray(property) && property.length > 0) {
      return property[0];
    }
    throw new Error("No se encontró la propiedad con el ID proporcionado.");
  } catch (error: any) {
    console.error("Error in getPropertyById:", error.message || error);
    throw new Error(error);
  }
};

export const getPropertyOwner = async (id: string): Promise<IAccountUser> => {
<<<<<<< HEAD
    try {
        const res = await fetch(`https://rentafacil.onrender.com/account/user/${id}`, {
            next: { revalidate: 1200 }
        });
        console.log(res);
=======
  try {
    const res = await fetch(`${API_URL}/account/user/${id}`, {
      next: { revalidate: 1200 },
    });
    console.log(res);
>>>>>>> 949b99b87aea735380626dd426bd12ca74ffd109

    if (!res.ok) {
      throw new Error(
        `Fallo al realizar el fetch a Owner por ID: ${res.status} ${res.statusText}`
      );
    }

    const owner: IAccountUser = await res.json();

    return owner;
  } catch (error: any) {
    console.error("Error in getPropertyOwner:", error.message || error);
    throw new Error(error);
  }
};
