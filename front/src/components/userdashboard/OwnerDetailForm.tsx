import React, { useEffect, useState } from "react";
import IUser from "@/interfaces/user";
import Swal from "sweetalert2";
import {CivilStatusOptions,EmploymentStatusOptions,} from "@/helpers/userStatus";
import { saveUser as saveUserUtil } from "@/helpers/userUtils";

interface OwnerDetailsFormProps {
  onComplete: (ownerDetails: IUser) => void;
}

interface OwnerDetailsFormProps {
  initialData?: Partial<IUser>;
  onComplete: (ownerDetails: IUser) => void;
  editableFields: string[];
}

const OwnerDetailsForm: React.FC<OwnerDetailsFormProps> = ({
  initialData = {},
  onComplete,
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [nationality, setNationality] = useState(initialData.nationality || "");
  const [civilStatus, setCivilStatus] = useState(initialData.civilStatus || "");
  const [employmentStatus, setEmploymentStatus] = useState(initialData.employmentStatus || "");
  const [id, setId] = useState(initialData.id || "");
  const [DOB, setDOB] = useState(initialData.DOB || "");
  const [phone, setPhone] = useState<number | string>(initialData.phone ? Number(initialData.phone) : "");
  const [dni, setDni] = useState<number | string>(initialData.dni ? Number(initialData.dni) : "");
  const [photo, setPhoto] = useState(initialData.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png");
  const [selectedImage, setSelectedImage] = useState<File | null>(null); 

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      setName(user.name || "");
      setLastName(user.lastName || "");
      setPhone(user.phone ? Number(user.phone) : "");
      setDni(user.dni ? Number(user.dni) : "");
      setEmail(user.email || "");
      setNationality(user.nationality || "");
      setCivilStatus(user.civilStatus || "");
      setEmploymentStatus(user.employmentStatus || "");
      setDOB(user.DOB ? new Date(user.DOB).toISOString().split("T")[0] : "");
      setPhoto(user.photo || "");
      setId(user.id || "");
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
  
    if (!name || !lastName || !email || !nationality || !DOB || !dni || !phone || !civilStatus || !employmentStatus || !photo) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.id) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se encontró el usuario. Por favor, inicia sesión.",
    });
    return;
  }
  
    const ownerDetails: IUser = {
      name,
      lastName,
      email,
      phone,
      nationality,
      dni,
      DOB,
      civilStatus,
      employmentStatus,
      isActive: user.isActive,
      photo,
      role: user.role,
      id: user.id 
    };
  
    try {
      const response = await fetch(`http://localhost:3002/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ownerDetails),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
  
        localStorage.setItem("user", JSON.stringify(updatedUser));
  
        Swal.fire({
          icon: "success",
          title: "¡Actualización exitosa!",
          text: "Los datos se han actualizado correctamente.",
        }).then(() => {
          onComplete(updatedUser); // Llama a onComplete solo después de que se muestre el swal
        });
        
      } else {
        const errorMessage = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: errorMessage || "No se pudo actualizar el usuario.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar al servidor. Intenta más tarde.",
      });
    }
  };

  const handleUpdate = async (userDetails: IUser) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró el usuario o el ID está ausente.",
      });
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3002/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails), 
      });
  
      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "¡Actualización exitosa!",
          text: "Los datos se han actualizado correctamente.",
        }).then(() => {
          onComplete(userDetails); // Llama a onComplete solo después de que se muestre el swal
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: "Hubo un error al actualizar los datos. Intenta nuevamente.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar al servidor. Intenta más tarde.",
      });
    }
  };
  

  const handleUserImageUpload = async (files: FileList) => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró el usuario. Por favor, inicia sesión.",
      });
      return [];
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", files[0]);

    try {
      const response = await fetch("http://localhost:3002/image/user-photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error al subir la foto",
          text: errorMessage || "No se pudo subir la imagen.",
        });
        return [];
      }

      const data = await response.json();
      return [data.photoUrl];
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar al servidor. Intenta más tarde.",
      });
      return [];
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setIsLoading(true);

      try {
        const uploadedImageUrls = await handleUserImageUpload(files);
        setPhoto(uploadedImageUrls[0]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isReadOnly = (field: string) => {
    return field !== "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Datos Personales</h2>
      <div>
        <label className="block font-semibold">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={isReadOnly(name)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(name) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Apellido:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          readOnly={isReadOnly(lastName)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(lastName) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Teléfono:</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(Number(e.target.value))}
          className={`border border-gray-300 rounded-md p-2 w-full`}
        />
      </div>
      <div>
        <label className="block font-semibold">Correo Electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={isReadOnly(email)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(email) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Nacionalidad:</label>
        <input
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          readOnly={isReadOnly(nationality)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(nationality) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">DNI:</label>
        <input
          type="number"
          value={dni}
          onChange={(e) => setDni(Number(e.target.value))}
          className={`border border-gray-300 rounded-md p-2 w-full`}
        />
      </div>
      <div>
        <label className="block font-semibold">Fecha de Nacimiento:</label>
        <input
          type="date"
          value={DOB}
          onChange={(e) => setDOB(e.target.value)}
          readOnly={isReadOnly(DOB)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(DOB) ? "bg-gray-100 text-gray-500" : ""
          }`}
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
        <label className="block font-semibold">Imagen de Perfil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <p className="text-gray-500 text-sm mt-1">
          Te pedimos una foto para validar tu identidad.
        </p>
        {isLoading && <p>Subiendo imagen...</p>}
        {photo &&
          photo !== "https://cdn-icons-png.flaticon.com/512/61/61205.png" && (
            <div className="mt-2">
              <img
                src={photo}
                alt="Perfil"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default OwnerDetailsForm;

