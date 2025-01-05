import { useState, useEffect } from "react";
import { IReview } from "../../interfaces/reviews";

const useReviews = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3002/reviews/");
        if (!response.ok) {
          throw new Error("Error al cargar las reseñas");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar las reseñas");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
};

export default useReviews;
