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
<<<<<<< HEAD
        const response = await fetch("https://rentafacil.onrender.com/property", {
=======
        const response = await fetch(`${API_URL}/property/all`, {
>>>>>>> 31c41c1a7b3d020d19d4d22d35bdb67e1fe7cd04
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
