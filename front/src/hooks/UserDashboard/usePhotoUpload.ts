import { useState } from "react";

const usePhotoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPhoto = async (userId: string, selectedPhoto: File | null, setUser: Function) => {
    if (!selectedPhoto) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedPhoto);
    formData.append("id", userId);

    try {
      const response = await fetch(`http://localhost:3002/image/user-photo`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la foto.");
      }

      const data = await response.json();
      setUser((prev: any) => (prev ? { ...prev, photo: data.photoUrl } : null));
    } catch (err: any) {
      setError("Hubo un error al subir la foto.");
      console.error("Error al subir la foto:", err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadPhoto, loading, error };
};

export default usePhotoUpload;
