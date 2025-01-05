import { useState } from "react";
import { IPropiedad } from "@/interfaces/properties";

const useEditProperty = () => {
  const [editingProperty, setEditingProperty] = useState<IPropiedad | null>(null);

  const handleEditClick = (property: IPropiedad) => {
    setEditingProperty(property);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editingProperty) {
      const { name, value } = e.target;
      setEditingProperty((prev) =>
        prev
          ? { ...prev, [name]: name === "price" ? [Number(value)] : value }
          : null
      );
    }
  };

  const handleSaveClick = (setProperties: React.Dispatch<React.SetStateAction<IPropiedad[]>>) => {
    if (editingProperty) {
      setProperties((prev) =>
        prev.map((property) =>
          property.id === editingProperty.id ? editingProperty : property
        )
      );
      setEditingProperty(null);
    }
  };

  const handleCancelClick = () => {
    setEditingProperty(null);
  };

  return {
    editingProperty,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleCancelClick,
  };
};

export default useEditProperty;
