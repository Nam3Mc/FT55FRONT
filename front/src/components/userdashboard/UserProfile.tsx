import React, { useState, useEffect } from "react";
import IUser from "@/interfaces/user";
import EditUserForm from "./EditUserForm";
import Swal from "sweetalert2";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.DOB) {
            parsedUser.DOB = new Date(parsedUser.DOB).toISOString().split("T")[0];
          }
          setUser(parsedUser);
        } else {
          setError("No se encontró información del usuario en el almacenamiento local.");
        }
      } catch (err) {
        console.error("Error al cargar el usuario desde localStorage:", err);
        setError("Hubo un error al cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleSave = async (updatedUser: IUser): Promise<void> => {
    try {
      localStorage.setItem("user", JSON.stringify(updatedUser)); 
      setUser(updatedUser); 
      setIsEditing(false); 
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Los cambios se han guardado correctamente.",
      });
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema al guardar los cambios.",
      });
    }
  };

  if (loading) {
    return <p>Cargando información...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {isEditing && user ? (
        <EditUserForm initialData={user} editableFields={["civilStatus", "employmentStatus", "email", "phone"]} onComplete={handleSave} />
      ) : (
        <section className="bg-white p-6 rounded-md shadow-md mb-8 flex flex-col sm:flex-row relative">
          <img
            src={user?.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png"}
            alt="Foto de perfil"
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover shadow-sm mx-auto sm:mx-0"
            onError={(e) => (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/61/61205.png"}
          />
          <div className="mt-4 sm:mt-0 sm:ml-5 flex flex-col items-center sm:items-start">
            {user?.name && <p className="text-sm sm:text-base"><span className="font-semibold">Nombre:</span> {user.name}</p>}
            {user?.lastName && <p className="text-sm sm:text-base"><span className="font-semibold">Apellido:</span> {user.lastName}</p>}
            {user?.email && <p className="text-sm sm:text-base"><span className="font-semibold">Correo electrónico:</span> {user.email}</p>}
            {user?.nationality && <p className="text-sm sm:text-base"><span className="font-semibold">Nacionalidad:</span> {user.nationality}</p>}
            {user?.DOB && <p className="text-sm sm:text-base"><span className="font-semibold">Fecha de Nacimiento:</span> {new Date(user.DOB).toLocaleDateString("es-ES")}</p>}
            {user?.dni && <p className="text-sm sm:text-base"><span className="font-semibold">DNI:</span> {user.dni}</p>}
            {user?.civilStatus && <p className="text-sm sm:text-base"><span className="font-semibold">Estado Civil:</span> {user.civilStatus}</p>}
            {user?.employmentStatus && <p className="text-sm sm:text-base"><span className="font-semibold">Estado laboral:</span> {user.employmentStatus}</p>}
            {user?.phone && <p className="text-sm sm:text-base"><span className="font-semibold">Teléfono:</span> {user.phone}</p>}
            <button
              onClick={handleEditClick}
              className="py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] mt-4 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4"
            >
              Editar
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserProfile;
