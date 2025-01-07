import React, { useState } from 'react';
import AllReviews from './AdminReviews';
import AllReservations from './AdminReservations';
import AllProperties from './AdminProperties';
import AllUsers from './AdminAllUsers';

const UserDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'users' | 'properties' | 'reservations' | 'reviews'>('users');
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f9f9f9] text-[#0a0a0a]">
  <aside className="w-full md:w-1/4 md:h-screen sticky top-0 bg-[#f9f9f9] shadow-md p-4 flex flex-row md:flex-col items-center md:items-start space-x-2 md:space-x-0 md:space-y-4">
    <button
      onClick={() => setActiveSection('users')}
      className="w-full p-3 lg:py-5 lg:px-8 text-center md:text-left rounded-md lg:rounded-lg bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
    >
      Usuarios
    </button>
    <button
      onClick={() => setActiveSection('properties')}
      className="w-full p-3 lg:py-5 lg:px-8 text-center md:text-left rounded-md lg:rounded-lg bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
    >
      Propiedades
    </button>
    <button
      onClick={() => setActiveSection('reservations')}
      className="w-full p-3 lg:py-5 lg:px-8 text-center md:text-left rounded-md lg:rounded-lg bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
    >
      Reservas
    </button>
    <button
      onClick={() => setActiveSection('reviews')}
      className="w-full p-3 lg:py-5 lg:px-8 text-center md:text-left rounded-md lg:rounded-lg bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
    >
      Reseñas
    </button>
  </aside>
  <main className="flex-1 p-4 md:p-8">
    {activeSection === 'users' && <AllUsers />}
    {activeSection === 'properties' && <AllProperties />}
    {activeSection === 'reservations' && <AllReservations />}
    {activeSection === 'reviews' && <AllReviews />}
  </main>
</div>
  );
};

export default UserDashboard;
