import React, { useState } from 'react';
import IUser from "@/interfaces/user";
import UserProfile from './UserProfile';
import MyProperties from './UserProperties';
import { IPropiedad } from '@/interfaces/properties';
import MyReservations from './UserReservations';
import MyReviews from './UserReviews';

const UserDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'properties' | 'reservations' | 'reviews'>('profile');

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] text-[#0a0a0a]">
      <aside className="w-1/4 h-screen sticky top-0 bg-[#f9f9f9] shadow-md p-4 space-y-4 flex flex-col items-start">
        <button
          onClick={() => setActiveSection('profile')}
          className="w-full p-3 text-left rounded-md bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          Perfil
        </button>
        <button
          onClick={() => setActiveSection('properties')}
          className="w-full p-3 text-left rounded-md bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          Mis Propiedades
        </button>
        <button
          onClick={() => setActiveSection('reservations')}
          className="w-full p-3 text-left rounded-md bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          Mis Reservas
        </button>
        
        <button
          onClick={() => setActiveSection('reviews')}
          className="w-full p-3 text-left rounded-md bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          Mis Reseñas
        </button>
      </aside>
      <main className="flex-1 p-8">
        {activeSection === 'profile' && <UserProfile />}
        {activeSection === 'properties' && <MyProperties />}
        {activeSection === 'reservations' && <MyReservations />}
        {activeSection === 'reviews' && <MyReviews propertyId={''} />}
      </main>
    </div>
  );
};

export default UserDashboard;
