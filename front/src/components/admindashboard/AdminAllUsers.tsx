import React, { useState } from "react";
import useUsers from "../../hooks/AdminDashboard/useUsers";
import IUser from "../../interfaces/user";

const AllUsers: React.FC = () => {
  const { users, loading, error, handleActivate, handleDesactivate } =
    useUsers();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>

      {selectedUser ? (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
          <button
            className="text-blue-500 mb-4"
            onClick={() => setSelectedUser(null)}
          >
            Volver a la lista
          </button>
          <div className="flex items-center space-x-4">
            <img
              src={
                selectedUser.photo ||
                "https://cdn-icons-png.flaticon.com/512/61/61205.png"
              }
              alt={`${selectedUser.name} ${selectedUser.lastName}`}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold">
                {selectedUser.name} {selectedUser.lastName}
              </h3>
              <p className="text-gray-600">Email: {selectedUser.email}</p>
              <p className="text-gray-600">
                Estado: {selectedUser.active ? "Activo" : "Desactivado"}
              </p>
              <p className="text-gray-600">
                Teléfono: {selectedUser.phone || "No disponible"}
              </p>
              <button
                className={`mt-4 px-4 py-2 rounded-md text-white ${
                  selectedUser.active
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() =>
                  selectedUser.active
                    ? handleDesactivate(selectedUser.id)
                    : handleActivate(selectedUser.id)
                }
              >
                {selectedUser.active ? "Desactivar" : "Activar"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 flex items-center space-x-4 cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={
                    user.photo ||
                    "https://cdn-icons-png.flaticon.com/512/61/61205.png"
                  }
                  alt={`${user.name} ${user.lastName}`}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {user.name} {user.lastName}
                  </h3>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-sm text-gray-500">
                    Estado: {user.active ? "Activo" : "Desactivado"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay usuarios para mostrar.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
