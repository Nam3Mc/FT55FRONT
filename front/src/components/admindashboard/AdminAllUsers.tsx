import React, { useEffect, useState } from 'react';
import IUser from '../../interfaces/user';
import { MdOutlineNotificationsPaused } from "react-icons/md";

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) {
          throw new Error('Error al cargar los usuarios');
        }
        const data = await response.json();
        setUsers(data); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const handleDeactivate = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/deactivate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al desactivar el usuario');
      }

      setUsers(users.map(user =>
        user.id === userId ? { ...user, active: false } : user
      ));
    } catch (err: any) {
      setError(err.message);
    }
  };


  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      <ul className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 flex justify-between items-center"
            >
              <div className="flex flex-col">
              <h3 className="text-xl font-semibold">{user.firstname} {user.lastname}</h3>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-400 text-sm">Fecha de registro: {user.registeredAt}</p>
              <p className="text-sm text-gray-500">Estado: {user.active ? 'Activo' : 'Desactivado'}</p>
              </div>
              <div className="flex space-x-4">
               
              <button 
                  className="bg-transparent text-black p-2 rounded-md hover:bg-gray-100"
                  onClick={() => handleDeactivate(user.id)}
                >
                 <MdOutlineNotificationsPaused className="h-6 w-6" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No hay usuarios para mostrar.</p>
        )}
      </ul>
    </div>
  );
};

export default AllUsers;