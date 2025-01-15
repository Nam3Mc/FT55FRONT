import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import IUser from "@/interfaces/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useEditUser = (onComplete: (updatedUser: IUser) => Promise<void>) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const userId = parsedUser.id;

          if (!userId) {
            throw new Error("El usuario no tiene un ID válido.");
          }

          const response = await fetch(`${API_URL}/users/${userId}`);
          if (!response.ok) {
            throw new Error("Error al obtener la información del usuario desde el servidor.");
          }

          const fullUserData = await response.json();

          if (fullUserData.DOB) {
            fullUserData.DOB = new Date(fullUserData.DOB).toISOString().split("T")[0];
          }

          console.log("Usuario obtenido desde el backend:", fullUserData);
          setUser(fullUserData);
        } else {
          setError("No se encontró información del usuario en el almacenamiento local.");
        }
      } catch (err) {
        console.error("Error al cargar el usuario:", err);
        setError("Hubo un error al cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleImageChange = (file: File) => {
    setSelectedImage(file);
    if (user) {
      setUser({ ...user, photo: URL.createObjectURL(file) });
    }
  };

  const saveChanges = async () => {
    if (!user) return;
  
    setLoading(true);
    const phone = parseInt(user.phone as string, 10);
    const dni = parseInt(user.dni as string, 10);
  
    if (isNaN(phone) || isNaN(dni)) {
      Swal.fire({
        title: "Error",
        text: "El teléfono y DNI deben ser números enteros.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    const updatedUser = { ...user, phone, dni };
  
    try {
      Swal.fire({
        title: "Aguarde un momento",
        text: "Se están actualizando los datos...",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      let uploadedPhotoUrl = user.photo;
      if (selectedImage) {
        uploadedPhotoUrl = await uploadImage(selectedImage);
      }
  
       const response = await fetch(`${API_URL}/users/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
        
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        throw new Error("Error al guardar los cambios del usuario.");
      }
  
      const savedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(savedUser));
      onComplete(savedUser);
  
      Swal.fire({
        title: "¡Éxito!",
        text: "Los cambios se han guardado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar los cambios.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    if (!user?.id) throw new Error("No se encontró el ID del usuario.");
    formData.append("file", file);
    formData.append("id", user.id);

    const response = await fetch(`${API_URL}/image/user-photo`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Error al subir la imagen.");
    }

    const data = await response.json();
    return data.photoUrl;
  };

  return {
    user,
    loading,
    error,
    handleImageChange,
    saveChanges,
  };
};

export default useEditUser;