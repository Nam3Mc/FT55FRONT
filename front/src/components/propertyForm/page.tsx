"use client";
import React, { useState } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dddh5wrx3/image/upload";
const UPLOAD_PRESET = "ml_default";

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: number;
    address: string;
    hasMinor: boolean;
    pets: boolean;
    accountId: string;
    image: string[]; 
  }>({
    name: '',
    description: '',
    price: 0,
    address: '',
    hasMinor: false,
    pets: false,
    accountId: '',
    image: [], 
  });
  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadedPhotos: string[] = [];

      for (const file of files) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", UPLOAD_PRESET);

        try {
          const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: uploadData,
          });

          if (!response.ok) {
            throw new Error("Error al subir la imagen.");
          }

          const data = await response.json();
          uploadedPhotos.push(data.secure_url);
        } catch (error) {
          console.error("Error subiendo imagen:", error);
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        image: [...prevData.image, ...uploadedPhotos],
      }));
    }
  };
 
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      if (target.type === "checkbox") {
        setFormData((prevData) => ({
          ...prevData,
          [target.name]: target.checked, 
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [target.name]: target.value,  
        }));
      }
    } else if (target instanceof HTMLTextAreaElement) {
      setFormData((prevData) => ({
        ...prevData,
        [target.name]: target.value, 
      }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la propiedad");
      }

      const data = await response.json();
      console.log("Propiedad creada:", data);
    } catch (error) {
      console.error("Error creando propiedad:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">Crear Propiedad</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-800 text-lg">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Dirección:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Permite menores:</label>
          <input
            type="checkbox"
            name="hasMinor"
            checked={formData.hasMinor}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Permite mascotas:</label>
          <input
            type="checkbox"
            name="pets"
            checked={formData.pets}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        <div>
          <label className="block text-gray-800 text-lg">Imágenes:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-2 w-full"
          />
        </div>
      </div>

      <button type="submit" className="w-full p-3 bg-champagne text-black rounded-md hover:bg-[#e2c595]">
        Crear Propiedad
      </button>
    </form>
  );
};

export default PropertyForm;
