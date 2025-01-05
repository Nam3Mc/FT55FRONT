import React, { useState } from 'react';
import AllReviews from './AdminReviews';
import AllReservations from './AdminReservations';
import AllProperties from './AdminProperties';
import AllUsers from './AdminAllUsers';

const UserDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'users' | 'properties' | 'reservations' | 'reviews'>('profile');
  return (
    <div className="flex min-h-screen bg-[#f2f2f2] text-[#0a0a0a]">
      <aside className="w-1/4 h-screen sticky top-0 bg-[#f9f9f9] shadow-md p-4 space-y-4 flex flex-col items-start">
        <button
          onClick={() => setActiveSection('users')}
          className="w-full p-3 text-left rounded-md bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          Usuarios
        </button>
        <button
          onClick={() => setActiveSection('properties')}
          className="w-full p-3 text-left rounded-md bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          Propiedades
        </button>
        <button
          onClick={() => setActiveSection('reservations')}
          className="w-full p-3 text-left rounded-md bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          Reservas
        </button>
        
        <button
          onClick={() => setActiveSection('reviews')}
          className="w-full p-3 text-left rounded-md bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          Reseñas
        </button>
      </aside>
      <main className="flex-1 p-8">
        {activeSection === 'users' && <AllUsers />}
        {activeSection === 'properties' && <AllProperties />}
        {activeSection === 'reservations' && <AllReservations />}
        {activeSection === 'reviews' && <AllReviews/>}
      </main>
    </div>
  );
};

export default UserDashboard;
