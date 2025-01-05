"use client"
// react
import React, { useEffect, useState } from 'react';

// import { productsToPreLoad } from '@/helpers/data';
import { EmptyFavorites } from '@/components/empty_favorites';
import { IProperty } from '@/interfaces/IProperty';
import CardFavs from '../card_favs';

export const ContentFavorite: React.FC = () => {
    const [favorites, setFavorites] = useState<IProperty[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
        setTimeout(() => setIsLoading(false), 1000);
      }, []);
  
return (
  <div className='m-8'>
     <h1 className="text-3xl font-bold text-velvet mb-6">Mis Favoritos</h1>
     {isLoading ? (
        // Mostrar mensaje mientras se cargan los favoritos
        <div className="text-gray-500 text-lg">Cargando favoritos...</div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {favorites.length > 0 ? (
            favorites.map((property) => (
              <CardFavs {...property} key={property.id} />
            ))
          ) : (
            <EmptyFavorites />
          )}
        </div>
      )}
  </div>
)
}

export default ContentFavorite;