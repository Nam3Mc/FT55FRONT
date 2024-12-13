import React, { useEffect, useState } from "react";
import IUser from "@/interfaces/user";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserById = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const userId = userData.id;
        try {
          const response = await fetch(`http://localhost:3002/users/${userId}`);
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          const user = await response.json();
          console.log("Usuario:", user);
          setUser(user);
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          setError("No se pudo obtener la información del usuario.");
        }
      } else {
        setError("No se encontró información del usuario en el localStorage.");
      }
      setLoading(false);
    };
  
    fetchUserById();
  }, []);
  
 

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSaveClick = () => {
    if (editedUser) {
      setUser(editedUser);
      localStorage.setItem('user', JSON.stringify(editedUser));
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <section className="bg-white p-6 rounded-md shadow-md mb-8 flex relative">
    <img
        src={user?.profileImgUrl || "https://cdn-icons-png.flaticon.com/512/61/61205.png"}
        alt="Foto de perfil"
        className="w-24 h-24 rounded-full object-cover shadow-sm"
        onError={(e) => {
        (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/61/61205.png";
        }}
      />
      <div className="ml-6">
        <h3 className="text-xl font-bold mb-4">Mi Perfil</h3>
        {loading ? (
          <p>Cargando información del usuario...</p>
        ) : error ? (
          <p>{error}</p>
        ) : user ? (
          isEditing ? (
            <div>
              <div className="mb-4">
                <label className="block font-semibold">Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={editedUser?.name || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Apellido:</label>
                <input
                  type="text"
                  name="lastName"
                  value={editedUser?.lastName || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Correo electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser?.email || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={editedUser?.phone || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <button
                onClick={handleSaveClick}
                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelClick}
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 ml-2"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <p>
                <span className="font-semibold">Nombre:</span> {user.name} {user.lastName}
              </p>
              <p>
                <span className="font-semibold">Correo electrónico:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Teléfono:</span> {user.phone}
              </p>
              <p>
                <span className="font-semibold">Nacionalidad:</span> {user.nationality}
              </p>
              <p>
                <span className="font-semibold">DNI:</span> {user.dni}
              </p>
              <p>
                <span className="font-semibold">Fecha de Nacimiento:</span>{" "}
                {user.DOB ? new Date(user.DOB).toLocaleDateString("es-ES") : ""}
              </p>
            </div>
          )
        ) : null}
      </div>
      {!isEditing && (
        <button
          onClick={handleEditClick}
          className="py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] absolute bottom-4 right-4"
        >
          Editar
        </button>
      )}
    </section>
  );
};

export default UserProfile;
