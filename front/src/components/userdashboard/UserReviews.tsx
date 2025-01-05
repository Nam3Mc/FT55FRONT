import React, { useEffect, useState } from 'react';
import { IReview } from '@/interfaces/reviews';

const MyReviews: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  const hardcodedReviews: IReview[] = [
    {
      id: "1",
      userId: "123",
      user: {
        id: "123",
        name: "Juan",
        lastName: "Pérez",
        DOB: "1990-01-01",
        phone: "+34 123 456 789",
        email: "juan.perez@example.com",
        profileImgUrl: "https://via.placeholder.com/150?text=Usuario",
        registeredAt: "2023-01-01",
        active: true,
        reservations: () => null,
        civilStatus: '',
        photo: '',
        employmentStatus: '',
        isActive: ''
      },
      property: {
        id: 1,
        owner: {
          id: "123",
          name: "Juan",
          lastName: "Pérez",
          DOB: "1990-01-01",
          phone: "+34 123 456 789",
          email: "juan.perez@example.com",
          profileImgUrl: "https://via.placeholder.com/150?text=Propietario",
          registeredAt: "2023-01-01",
          active: true,
          reservations: () => null,
          civilStatus: '',
          photo: '',
          employmentStatus: '',
          isActive: ''
        },
        active: true,
        title: "Casa en la playa",
        description: "Hermosa casa frente al mar",
        state: "Cataluña",
        city: "Barcelona",
        price: [150],
        bedrooms: [3],
        bathrooms: 2,
        isAvailable: true,
        capacity: 6,
        photos: ["https://via.placeholder.com/300?text=Casa"],
        stripeProductId: "prod_123",
        stripePriceId: "price_123",
        reviews: [],
        reservationDetail: {
          userId: "123",
          id: "res_1",
          reservation: {} as any,
          checkIn: "2023-12-01",
          checkOut: "2023-12-15",
          pax: 4,
          property: "1",
        },
        latitude: 41.3879,
        longitude: 2.16992,
      },
      reviewDate: "2023-12-10",
      comment: "Excelente lugar para vacaciones.",
      rating: 5,
    },
    {
      id: "2",
      userId: "123",
      user: {
        id: "123",
        name: "Juan",
        lastName: "Pérez",
        DOB: "1990-01-01",
        phone: "+34 123 456 789",
        email: "juan.perez@example.com",
        profileImgUrl: "https://via.placeholder.com/150?text=Usuario",
        registeredAt: "2023-01-01",
        active: true,
        reservations: () => null,
        civilStatus: '',
        photo: '',
        employmentStatus: '',
        isActive: ''
      },
      property: {
        id: 2,
        owner: {
          id: "123",
          name: "Juan",
          lastName: "Pérez",
          DOB: "1990-01-01",
          phone: "+34 123 456 789",
          email: "juan.perez@example.com",
          profileImgUrl: "https://via.placeholder.com/150?text=Propietario",
          registeredAt: "2023-01-01",
          active: true,
          reservations: () => null,
          civilStatus: '',
          photo: '',
          employmentStatus: '',
          isActive: ''
        },
        active: true,
        title: "Apartamento en la ciudad",
        description: "Moderno apartamento en el centro",
        state: "Madrid",
        city: "Madrid",
        price: [100],
        bedrooms: [2],
        bathrooms: 1,
        isAvailable: true,
        capacity: 4,
        photos: ["https://via.placeholder.com/300?text=Apartamento"],
        stripeProductId: "prod_124",
        stripePriceId: "price_124",
        reviews: [],
        reservationDetail: {
          userId: "123",
          id: "res_2",
          reservation: {} as any,
          checkIn: "2023-12-20",
          checkOut: "2023-12-30",
          pax: 2,
          property: "2",
        },
        latitude: 40.4168,
        longitude: -3.7038,
      },
      reviewDate: "2023-12-15",
      comment: "Muy cómodo y céntrico.",
      rating: 4,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setReviews(hardcodedReviews);
      setLoading(false);
    }); 
  }, []);

  if (loading) {
    return <p>Cargando reseñas...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Reseñas</h2>
      <p className="text-sm text-gray-500 mb-4">Acá podras ver todas las reseñas que hiciste de los alojamientos que te hospedaste</p>
      <ul className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li
              key={review.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
            >
              <h3 className="text-xl font-semibold">{review.property.title}</h3>
              <p className="text-gray-600">{review.comment}</p>
              <p className="font-medium">
                Calificación: <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
              </p>
              <p className="text-gray-400 text-sm">Fecha: {review.reviewDate}</p>
            </li>
          ))
        ) : (
          <p>No hay reseñas para mostrar.</p>
        )}
      </ul>
    </div>
  );
};

export default MyReviews;
