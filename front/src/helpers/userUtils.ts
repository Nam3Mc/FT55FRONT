import IUser from "@/interfaces/user";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const saveUser = async (updatedUser: IUser): Promise<IUser> => {
  try {
    const response = await fetch(`${API_URL}/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      const errorText = await response.text();
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: errorText || "No se pudo actualizar el usuario.",
      });
      throw new Error(errorText);
    }

    const savedUser = await response.json();
    localStorage.setItem("user", JSON.stringify(savedUser));

    Swal.fire({
      icon: "success",
      title: "¡Actualización exitosa!",
      text: "Los datos se han actualizado correctamente.",
    });

    return savedUser;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error de red",
      text: "No se pudo conectar al servidor. Intenta más tarde.",
    });
    throw error;
  }
};
