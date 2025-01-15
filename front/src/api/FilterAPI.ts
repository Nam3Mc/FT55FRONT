import { IProperty } from "@/interfaces/IProperty";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface IFilters {
  minors?: boolean;
  pets?: boolean;
  checkOut?: string;
  checkIn?: string;
  capacity?: number;
  type?: string;
  country?: string;
}

export const FilterProperties = async (
  filters: IFilters
): Promise<IProperty[] | undefined> => {
  try {
    if (filters.country) {
      const normalizeCountry = (country: string): string => {
        const countryMapping: Record<string, string> = {
          mexico: "México",
          espana: "España",
          peru: "Perú",
          costarica: "Costa Rica",
          "costa rica": "Costa Rica",
          "united states": "United States",
          unitedstates: "United States",
          panama: "Panamá",
        };
        const normalized = country.trim().toLowerCase();
        return (
          countryMapping[normalized] ||
          normalized.charAt(0).toUpperCase() + normalized.slice(1)
        );
        // filters.country = filters.country
        //   .trim()
        //   .toLowerCase()
        //   .replace(/\b\w/g, (char) => char.toUpperCase());
      };
      filters.country = normalizeCountry(filters.country);
    }
    // Convierte los filtros en parámetros de consulta
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      )
    ).toString();
    console.log("resultado de queryString:", queryString);
    // Realizar la solicitud GET con los parámetros
    const res = await fetch(`${API_URL}/property/filter?${queryString}`, {
      method: "GET",
    });

    if (res.ok) {
      // Retornar las propiedades filtradas
      return res.json();
    } else {
      const errorDetails = await res.text();
      console.error("Error details:", errorDetails);
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "No pudimos realizar el filtrado",
      });
    }
  } catch (error: any) {
    console.error("Error al filtrar propiedades:", error);
    Swal.fire({
      icon: "error",
      title: "Ups...",
      text: "Algo salió mal",
    });
    throw new Error(error);
  }
};
