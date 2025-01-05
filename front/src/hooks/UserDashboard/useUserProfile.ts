import { useState, useEffect } from "react";
import IUser from "@/interfaces/user";

const useUserProfile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setError("No se encontró información del usuario en el almacenamiento local.");
      }
    } catch (err) {
      console.error("Error al cargar el usuario desde localStorage:", err);
      setError("Hubo un error al cargar la información del usuario.");
    } finally {
      setLoading(false);
    }
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
        throw new Error("Error al guardar los cambios del usuario.");
      }

      const savedUser = await response.json();
      setUser(savedUser);
      localStorage.setItem("user", JSON.stringify(savedUser));
      return savedUser;
    } catch (error) {
      console.error("Error al guardar los cambios del usuario:", error);
      throw error;
    }
  };

  return { user, loading, error, setUser, saveUser };
};

export default useUserProfile;
