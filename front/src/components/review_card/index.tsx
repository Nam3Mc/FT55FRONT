import React from 'react';

interface ReviewProps {
    photo: string;
    title: string; 
    comment: string;
    rating: number;
    date: string
}

const ReviewCard: React.FC<ReviewProps> = ({ photo, title, comment, rating, date }) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-yellow-500 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="flex items-center p-4 border rounded-lg shadow-sm bg-white">
      {/* Foto */}
      <img src={photo} alt="User profile" className="w-16 h-16 rounded-full mr-4" />

      {/* Contenido */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 mb-2">{comment}</p>
        <div className="flex items-center mb-1">{renderStars()}</div>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
