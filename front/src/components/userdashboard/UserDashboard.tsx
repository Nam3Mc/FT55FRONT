import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import MyProperties from './UserProperties';
import MyReservations from './UserReservations';
import MyReviews from './UserReviews';
import OwnerDetailsForm from './OwnerDetailForm';
import IUser from '@/interfaces/user';
import Swal from 'sweetalert2';

const UserDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'properties' | 'reservations' | 'reviews'>('profile');
  const [isOwnerDetailsComplete, setIsOwnerDetailsComplete] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (
      user &&
      user.name && user.lastName && user.email && user.nationality && 
      user.DOB && user.dni && user.phone && user.civilStatus && user.employmentStatus
    ) {
      setIsOwnerDetailsComplete(true);
    }
  }, []);

  const handleOwnerDetailsComplete = (ownerDetails: IUser) => {
    setIsOwnerDetailsComplete(true);
  };

  const handlePropertiesClick = () => {
    if (!isOwnerDetailsComplete) {
      Swal.fire({
        icon: "warning",
        title: "¡Datos incompletos!",
        text: "Por favor, completa tus datos personales antes de acceder a 'Mis Propiedades'.",
        showCancelButton: true,
        confirmButtonText: "Ir al formulario",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setActiveSection('properties');
        }
      });
    } else {
      setActiveSection('properties'); 
    }
  };

  return (
<div className="flex flex-col md:flex-row min-h-screen bg-[#f9f9f9] text-[#0a0a0a]">
  <aside className="w-full md:w-1/4 md:h-screen sticky top-0 bg-[#f9f9f9] shadow-md p-4 flex flex-row md:flex-col items-center md:items-start space-x-2 md:space-x-0 md:space-y-4">
    <button
      onClick={() => setActiveSection('profile')}
      className="w-full p-3 lg:py-5 lg:px-8 text-center md:text-left rounded-md lg:rounded-lg bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
    >
      Perfil
    </button>
    <button
      onClick={handlePropertiesClick}
      className="w-full p-3 lg:py-5 lg:px-8 text-center md:text-left rounded-md lg:rounded-lg bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
    >
      Mis Propiedades
    </button>
    <button
      onClick={() => setActiveSection('reservations')}
      className="w-full p-3 lg:py-5 lg:px-8 text-center md:text-left rounded-md lg:rounded-lg bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
    >
      Mis Reservas
    </button>
    <button
      onClick={() => setActiveSection('reviews')}
      className="w-full p-3 lg:py-5 lg:px-8 text-center md:text-left rounded-md lg:rounded-lg bg-white shadow hover:bg-gray-100 hover:shadow-lg transition duration-200"
    >
      Mis Reseñas
    </button>
  </aside>
  <main className="flex-1 p-4 md:p-8">
    {activeSection === 'profile' && <UserProfile />}
    {activeSection === 'properties' && (
      isOwnerDetailsComplete ? (
        <MyProperties />
      ) : (
        <OwnerDetailsForm onComplete={handleOwnerDetailsComplete} />
      )
    )}
    {activeSection === 'reservations' && <MyReservations />}
    {activeSection === 'reviews' && <MyReviews propertyId={''} />}
  </main>
</div>
  );
};
export default UserDashboard;