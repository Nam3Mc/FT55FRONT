import React, { useState } from "react";
import useUsers from "../../hooks/AdminDashboard/useUsers";
import IUser from "../../interfaces/user";

const AllUsers: React.FC = () => {
  const { users, loading, error, handleActivate, handleDesactivateUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "active") return user.isActive;
    if (filter === "inactive") return !user.isActive;
    return true; 
  });

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center md:text-left">
          Lista de Usuarios
        </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "active" | "inactive")}
          className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Desactivados</option>
        </select>
      </div>

      {selectedUser ? (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
          <button
            className="text-blue-500 mb-4"
            onClick={() => setSelectedUser(null)}
          >
            Volver a la lista
          </button>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={
                selectedUser && !brokenImages[selectedUser.id]
                  ? selectedUser.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png"
                  : "https://cdn-icons-png.flaticon.com/512/61/61205.png"
              }
              alt={`${selectedUser.name} ${selectedUser.lastName}`}
              className="h-24 w-24 rounded-full object-cover"
              onError={() => {
                if (selectedUser) {
                  handleImageError(selectedUser.id);
                }
              }}
            />
            <div className="text-center md:text-left flex flex-col space-y-4 w-full">
              <h3 className="text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedUser.name} {selectedUser.lastName}
              </h3>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                Email: {selectedUser.email}
              </p>
              <p className="text-gray-600">
                Estado:{" "}
                <span className={selectedUser.isActive ? "text-green-500" : "text-red-500"}>
                  {selectedUser.isActive ? "Activo" : "Desactivado"}
                </span>
              </p>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                Teléfono: {selectedUser.phone || "No disponible"}
              </p>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                Nacionalidad: {selectedUser.nationality || "No disponible"}
              </p>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                Fecha de Nacimiento:{" "}
                {selectedUser.DOB
                  ? new Date(selectedUser.DOB).toLocaleDateString("es-ES") 
                  : "No disponible"}
              </p>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                DNI: {selectedUser.dni || "No disponible"}
              </p>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                Estado Civil: {selectedUser.civilStatus || "No disponible"}
              </p>
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                Estado Laboral: {selectedUser.employmentStatus || "No disponible"}
              </p>
              <button
                className={`mt-4 px-4 py-2 rounded-md text-white ${
                  selectedUser.isActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={async () => {
                  if (selectedUser.isActive) {
                    await handleDesactivateUser(selectedUser.id);
                    setSelectedUser({ ...selectedUser, isActive: false });
                  } else {
                    await handleActivate(selectedUser.id);
                    setSelectedUser({ ...selectedUser, isActive: true });
                  }
                }}
              >
                {selectedUser.isActive ? "Desactivar" : "Activar"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={
                    brokenImages[user.id]
                      ? "https://cdn-icons-png.flaticon.com/512/61/61205.png"
                      : user.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png"
                  }
                  alt={`${user.name} ${user.lastName}`}
                  className="h-20 w-20 rounded-full object-cover"
                  onError={() => handleImageError(user.id)}
                />
                <div className="text-center sm:text-left flex flex-col space-y-4 w-full">
                  <h3 className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.name} {user.lastName}
                  </h3>
                  <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                    Email: {user.email}
                  </p>
                  <p className="text-gray-600">
                    Estado:{" "}
                    <span className={user.isActive ? "text-green-500" : "text-red-500"}>
                      {user.isActive ? "Activo" : "Desactivado"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-2">No hay usuarios para mostrar.</p>
          )}
        </div>
      )}
    </div>
    );
  };

export default AllUsers;