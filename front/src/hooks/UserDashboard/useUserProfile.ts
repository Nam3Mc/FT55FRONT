import { useState, useEffect } from "react";
import IUser from "@/interfaces/user";

const useUserProfile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
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

  const saveUser = async (updatedUser: IUser) => {
    try {
      const response = await fetch(`http://localhost:3002/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        throw new Error("Error al guardar los cambios del usuario.");
      }

      const savedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(savedUser));
      setUser(savedUser);
      return savedUser;
    } catch (error) {
      console.error("Error al guardar los cambios del usuario:", error);
      throw error;
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3002/image/user-photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error al subir la imagen.");
      }

      const data = await response.json();
      return data.photoUrl;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
  };

  return { user, loading, error, setUser, saveUser, uploadImage };
};
export default useUserProfile;
