import React, { useState } from "react";
import IUser from "@/interfaces/user";

interface UserEditFormProps {
  user: IUser;
  onSave: (updatedUser: IUser) => void;
  onCancel: () => void;
  onPhotoChange: (file: File | null) => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ user, onSave, onCancel, onPhotoChange }) => {
  const [editedUser, setEditedUser] = useState<IUser>(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoChange(e.target.files[0]);
    }
  };

  const handleSave = () => onSave(editedUser);

  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold">Cambiar Foto:</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Nombre:</label>
        <input
          type="text"
          name="name"
          value={editedUser.name}
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
              <label className="block font-semibold">Correo Electrónico:</label>
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
            <div className="mb-4">
              <label className="block font-semibold">Nacionalidad:</label>
              <input
                type="text"
                name="nationality"
                value={editedUser?.nationality || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="DOB"
                value={editedUser?.DOB || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Estado Civil:</label>
              <input
                type="text"
                name="civilStatus"
                value={editedUser?.civilStatus || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
      <button
        onClick={handleSave}
        className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
      >
        Guardar
      </button>
      <button
        onClick={onCancel}
        className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 ml-2"
      >
        Cancelar
      </button>
    </div>
  );
};

export default UserEditForm;
