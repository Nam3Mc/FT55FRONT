import { useEffect, useState } from "react";
import { IPropiedad } from "../../interfaces/properties";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useFetchProperties = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await fetch(`${API_URL}/property/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`Error al cargar las propiedades: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("propiedades", data)
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
