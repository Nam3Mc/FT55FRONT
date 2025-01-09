import { useState } from "react";
import { IPropiedad } from "@/interfaces/properties";
import Swal from "sweetalert2";

const useEditProperty = () => {
  const [editingProperty, setEditingProperty] = useState<IPropiedad | null>(null);

  const handleEditClick = (property: IPropiedad) => {
    setEditingProperty(property);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editingProperty) {
      const { name, value, type, checked } = e.target as HTMLInputElement;
  
      setEditingProperty((prev) => {
        if (!prev) return null;
        const amenities = prev.amenities_ ?? {
          wifi: false,
          tv: false,
          airConditioning: false,
          piscina: false,
          parqueadero: false,
          cocina: false,
        };
        if (type === "checkbox" && name in amenities) {
          return {
            ...prev,
            amenities_: {
              ...amenities,
              [name]: checked,
            },
          };
        } else {
          return {
            ...prev,
            [name]: name === "price" ? [Number(value)] : value,
          };
        }
      });
    }
  };
  
  
  const handleSaveClick = async (setProperties: React.Dispatch<React.SetStateAction<IPropiedad[]>>) => {
    if (editingProperty) {
      try {
        const response = await fetch('/property/update', {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingProperty),
        });
  
        if (!response.ok) {
          throw new Error('Error al actualizar la propiedad');
        }
  
        const updatedProperty = await response.json(); // Suponiendo que el backend devuelve la propiedad actualizada
  
        setProperties((prev) =>
          prev.map((property) =>
            property.id === updatedProperty.id ? updatedProperty : property
          )
        );
  
        Swal.fire({
          title: 'Éxito',
          text: 'Propiedad actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setEditingProperty(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          Swal.fire('Error', err.message, 'error');
        } else {
          Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
        }
      }
    }
  };
  

  const handleCancelClick = () => {
    setEditingProperty(null);
  };

  const handleRemoveImage = async (
    propertyId: string,
    imageId: string,
    setProperties: React.Dispatch<React.SetStateAction<IPropiedad[]>>
  ) => {
    try {
      // Verificamos que los valores estén definidos
      if (!propertyId || !imageId) {
        throw new Error("Faltan parámetros para eliminar la imagen.");
      }
  
      console.log("Eliminando imagen con ID:", imageId); // Verifica que el ID sea correcto
  
      // Enviar solo el ID de la imagen al backend
      const response = await fetch(`/image`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageId), // Pasamos solo el ID de la imagen
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "No se pudo eliminar la imagen.");
      }
  
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === propertyId
            ? {
                ...property,
                image_: property.image_?.filter((image) => image.id !== imageId),
              }
            : property
        )
      );
  
      Swal.fire({
        icon: "success",
        title: "Imagen eliminada",
        text: "La imagen se ha eliminado correctamente.",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al eliminar la imagen.",
      });
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const handleImageUpload = async (images: FileList | null) => {
    if (!images) return;
  
    const imageUrls: string[] = [];
  
    for (const file of Array.from(images)) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://localhost:3002/image", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }

        if (!file.type.startsWith("image/")) {
          Swal.fire("Error", "El archivo debe ser una imagen", "error");
          continue; 
        }
  
        const imageUrl = await response.text();
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error("Error al subir una imagen:", error);
      }
    }
  
    return imageUrls;
  };
  
  return {
    editingProperty,
    setEditingProperty,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleCancelClick,
    handleRemoveImage,
    handleImageUpload 
  };
};

export default useEditProperty;
