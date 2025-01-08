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
  
        const data = await response.json();
  
        setProperties((prev) =>
          prev.map((property) =>
            property.id === editingProperty.id ? editingProperty : property
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

  return {
    editingProperty,
    setEditingProperty,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleCancelClick,
  };
};

export default useEditProperty;
