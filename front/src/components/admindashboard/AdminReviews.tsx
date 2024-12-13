import React, { useEffect, useState } from 'react';
import { IReview } from '../../interfaces/reviews';

const AllReviews: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3001/reviews/");
        if (!response.ok) {
          throw new Error('Error al cargar las reseñas');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewClick = (review: IReview) => {
    console.log("Reseña seleccionada:", review);
    setSelectedReview(selectedReview?.id === review.id ? null : review);
  };

  if (loading) {
    return <p>Cargando reseñas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Todas las Reseñas</h2>
      <ul className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li
              key={review.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 cursor-pointer"
              onClick={() => handleReviewClick(review)} 
            >
              <h3 className="text-xl font-semibold">
                {review.property ? review.property.title : "Propiedad no disponible"}
              </h3>
              <p className="text-gray-600">{review.comment}</p>
              <p className="font-medium">
                Calificación: <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
              </p>
              <p className="text-gray-400 text-sm">Fecha: {review.reviewDate}</p>

              {selectedReview?.id === review.id && (
                <>
                  
                  {review.property && (
                    <div className="mt-4">
                      <p><strong>Descripción:</strong> {review.property.description}</p>
                      <p><strong>Ubicación:</strong> {review.property.state}</p>
                      <p><strong>Precio:</strong> ${review.property.price}</p>
                      <p><strong>Capacidad:</strong> {review.property.capacity} personas</p>
                      {review.property.photos.length > 0 && (
                        <div className="flex space-x-2 mt-2">
                          {review.property.photos.map((photo, index) => (
                            <img key={index} src={photo} alt="Foto de la propiedad" className="w-20 h-20 object-cover rounded" />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  
                  {review.user && (
                    <div className="mt-4">
                      <p><strong>Reseñado por:</strong> {review.user.firstname}{review.user.lastname}</p>
                      <p><strong>Email:</strong> {review.user.email}</p>
                    </div>
                  )}
                </>
              )}
            </li>
          ))
        ) : (
          <p>No hay reseñas para mostrar.</p>
        )}
      </ul>
    </div>
  );
};

export default AllReviews;