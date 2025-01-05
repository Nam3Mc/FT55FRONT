import { useState, useEffect } from "react";
import { IPropiedad } from "@/interfaces/properties";

const useProperties = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          throw new Error("No se encontró información del usuario en el localStorage.");
        }

        const user = JSON.parse(storedUser);
        const userId = user.id;

        const response = await fetch(`http://localhost:3002/property/owner/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener las propiedades.");
        }

        const data: IPropiedad[] = await response.json();
        setProperties(data);
      } catch (error: any) {
        console.error("Error al cargar las propiedades:", error);
        setError(error.message || "Ocurrió un error.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error, setProperties };
};

export default useProperties;
