import { useEffect, useState } from "react";
import { IPropiedad } from "../../interfaces/properties";

const useFetchProperties = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3002/property", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar las propiedades");
        }

        const data = await response.json();
        setProperties(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, error, loading };
};

export default useFetchProperties;
