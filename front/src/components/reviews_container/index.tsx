import React from 'react';
import ReviewCard from '../review_card';

const ReviewsContainer: React.FC = () => {
  const reviews = [
    {
      id: 1,
      title: 'Hermosa casa en la montaña',
      comment: 'Un lugar increíble para descansar. Todo estuvo perfecto.',
      rating: 5,
      date: '10 de diciembre de 2024',
      photo: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      title: 'Apartamento cómodo en la ciudad',
      comment: 'Muy bien ubicado y cómodo, aunque un poco ruidoso.',
      rating: 4,
      date: '5 de diciembre de 2024',
      photo: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-40 mb-6">
      <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Comentarios</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsContainer;

