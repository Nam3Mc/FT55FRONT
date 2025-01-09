import React, { useState, useEffect } from "react";
import IUser from "@/interfaces/user";
import {CivilStatusOptions,EmploymentStatusOptions,} from "@/helpers/userStatus";
import Swal from "sweetalert2";

interface OwnerDetailsFormProps {
    initialData: IUser; 
    editableFields: string[];
    onComplete: (updatedUser: IUser) => Promise<void>;
  }

const EditUserForm: React.FC<OwnerDetailsFormProps> = ({editableFields,onComplete,}) => {
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.DOB) {
            parsedUser.DOB = new Date(parsedUser.DOB).toISOString().split("T")[0];
          }
          setName(parsedUser.name || "");
          setLastName(parsedUser.lastName || "");
          setEmail(parsedUser.email || "");
          setPhone(parsedUser.phone || "");
          setDni(parsedUser.dni || "");
          setNationality(parsedUser.nationality || "");
          setCivilStatus(parsedUser.civilStatus || "");
          setEmploymentStatus(parsedUser.employmentStatus || "");
          setDOB(parsedUser.DOB || "");
          setPhoto(parsedUser.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png");
          setId(parsedUser.id || "");
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      setPhoto(URL.createObjectURL(file));
    }
  };

  const saveChanges = async (updatedUser: IUser) => {
    try {
      Swal.fire({
        title: 'Aguarde un momento',
        text: 'Se están actualizando los datos...',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      let uploadedPhotoUrl = photo; 
      if (selectedImage) {
        try {
          uploadedPhotoUrl = await uploadImage(selectedImage); 
        } catch (uploadError) {
          setError("Error al subir la imagen.");
          setLoading(false);
          return;
        }
      }
  
      updatedUser.photo = uploadedPhotoUrl; 

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
      onComplete(savedUser); 
  
      Swal.close(); 
      Swal.fire({
        title: '¡Éxito!',
        text: 'Los cambios se han guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      Swal.close(); 
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar los cambios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false); 
    }
  };
  
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.id) {
      throw new Error("No se encontró el ID del usuario.");
    }
    formData.append("file", file);
    formData.append("id", user.id); 
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); 

    const updatedUser: IUser = {
      id,
      name,
      lastName,
      email,
      phone: parseInt(phone as string),
      dni: parseInt(dni as string),
      photo,
      nationality,
      civilStatus,
      employmentStatus,
      DOB,
    };

    await saveChanges(updatedUser);
  };
  

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

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
      <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
             {loading ? "Cargando..." : "Crear Propiedad"}
          </button>
    </form>
  );
};

export default EditUserForm;
