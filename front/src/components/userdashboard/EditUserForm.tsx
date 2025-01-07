import React, { useState, useEffect } from "react";
import IUser from "@/interfaces/user";
import {CivilStatusOptions,EmploymentStatusOptions,} from "@/helpers/userStatus";

interface OwnerDetailsFormProps {
    initialData: IUser; 
    editableFields: string[];
    onComplete: (updatedUser: IUser) => Promise<void>;
  }

const EditUserForm: React.FC<OwnerDetailsFormProps> = ({
  editableFields,
  onComplete,
}) => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [civilStatus, setCivilStatus] = useState<string>("");
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [DOB, setDOB] = useState<string>("");
  const [phone, setPhone] = useState<number | string>("");
  const [dni, setDni] = useState<number | string>("");
  const [photo, setPhoto] = useState<string>("https://cdn-icons-png.flaticon.com/512/61/61205.png");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user) {
      setName(user.name || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setDni(user.dni || "");
      setNationality(user.nationality || "");
      setCivilStatus(user.civilStatus || "");
      setEmploymentStatus(user.employmentStatus || "");
      setDOB(user.DOB || "");
      setPhoto(user.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png");
      setId(user.id || "");
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      setPhoto(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: IUser = {
      id,
      name,
      lastName,
      email,
      phone,
      dni,
      photo,
      nationality,
      civilStatus,
      employmentStatus,
      DOB,
    };

    onComplete(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Editar Perfil</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="DOB" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
        <input
          type="date"
          id="DOB"
          value={DOB}
          onChange={(e) => setDOB(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Estado Civil:</label>
        <select
          value={civilStatus}
          onChange={(e) => setCivilStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Seleccione una opción</option>
          {Object.values(CivilStatusOptions).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">Estado Laboral:</label>
        <select
          value={employmentStatus}
          onChange={(e) => setEmploymentStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Seleccione una opción</option>
          {Object.values(EmploymentStatusOptions).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm"
        />
        <div className="mt-4">
          <img src={photo} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover" />
        </div>
      </div>
      <button type="submit" className="w-full px-4 py-2 mt-6 bg-blue-600 text-white rounded-md">
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditUserForm;
