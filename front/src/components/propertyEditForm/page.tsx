"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import IFormData from "../../interfaces/formData";
import IUser from "@/interfaces/user";
import { TypeOfProperty } from "@/helpers/typeOfProperty";
import { IPropiedad } from "@/interfaces/properties";
import { useParams } from "next/navigation";

interface PropertyEditFormProps {
  property: IPropiedad;
}

const PropertyEditForm: React.FC<PropertyEditFormProps> = ({ property }) => {
  const [formData, setFormData] = useState<IFormData>({
    title: property.title || "",
    description: property.description || "",
    price: property.price || 1,
    state: property.state || "",
    city: property.city || "",
    bedrooms: property.bedrooms || 1,
    bathrooms: property.bathrooms || 1,
    capacity: property.capacity || 1,
    latitude: property.latitude || 0,
    longitude: property.longitude || 0,
    hasMinor: property.hasMinor || false,
    pets: property.pets || false,
    accountId: property.accountId || "",
    images: property.image_
      ? property.image_.map((img: { url: string }) => img.url)
      : [],
    address: property.address || "",
    wifi: property.wifi || false,
    tv: property.amenities_?.tv || false,
    airConditioning: property.amenities_?.airConditioning || false,
    piscina: property.amenities_?.piscina || false,
    parqueadero: property.amenities_?.parqueadero || false,
    cocina: property.amenities_?.cocina || false,
    isActive: property.isActive || false,
    type: property.type || "casa",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 10,
      state: "",
      city: "",
      bedrooms: 1,
      bathrooms: 1,
      capacity: 1,
      latitude: 0,
      longitude: 0,
      hasMinor: false,
      pets: false,
      accountId: "",
      images: [],
      address: "",
      wifi: false,
      tv: false,
      airConditioning: false,
      piscina: false,
      parqueadero: false,
      cocina: false,
      isActive: false,
      type: "casa",
    });
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title) {
      newErrors.title = "El título no debe estar vacío";
    } else if (formData.title.length < 8) {
      newErrors.title = "El título debe tener al menos 8 caracteres";
    } else if (formData.title.length > 50) {
      newErrors.title = "El título debe tener un máximo de 50 caracteres";
    }

    if (typeof formData.price !== "number" || formData.price <= 0) {
      newErrors.price = "El precio debe ser un número positivo";
    }

    if (!formData.state) {
      newErrors.state = "La provincia no debe estar vacía";
    }
    if (!formData.city) {
      newErrors.city = "La ciudad no debe estar vacía";
    }
    if (typeof formData.bedrooms !== "number" || formData.bedrooms < 0) {
      newErrors.bedrooms = "El número de habitaciones debe ser positivo";
    }
    if (typeof formData.bathrooms !== "number" || formData.bathrooms < 0) {
      newErrors.bathrooms = "El número de baños debe ser positivo";
    }
    if (typeof formData.capacity !== "number" || formData.capacity < 0) {
      newErrors.capacity = "La capacidad debe ser positiva";
    }

    if (typeof formData.wifi !== "boolean") {
      newErrors.wifi = "El campo wifi debe ser un valor booleano";
    }
    if (typeof formData.tv !== "boolean") {
      newErrors.tv = "El campo tv debe ser un valor booleano";
    }
    if (typeof formData.airConditioning !== "boolean") {
      newErrors.airConditioning =
        "El campo aire acondicionado debe ser un valor booleano";
    }
    if (typeof formData.piscina !== "boolean") {
      newErrors.piscina = "El campo piscina debe ser un valor booleano";
    }
    if (typeof formData.parqueadero !== "boolean") {
      newErrors.parqueadero = "El campo parqueadero debe ser un valor booleano";
    }
    if (typeof formData.cocina !== "boolean") {
      newErrors.cocina = "El campo cocina debe ser un valor booleano";
    }
    if (!Object.values(TypeOfProperty).includes(formData.type)) {
      newErrors.type = "Selecciona un tipo de propiedad válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { propertyId } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        console.error("No se ha proporcionado un propertyId.");
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3002/property/unique/${propertyId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener la propiedad");
        }
        const property = await response.json();
        console.log(property);
        setFormData(property);
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
        setError("No se pudo obtener la propiedad.");
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  useEffect(() => {
    const fetchUserById = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const userId = userData.id;
        try {
          const response = await fetch(`http://localhost:3002/users/${userId}`);
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          const user = await response.json();
          setUser(user);
          setFormData((prevData) => ({
            ...prevData,
            accountId: user.account_.id,
          }));
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          setError("No se pudo obtener la información del usuario.");
        }
      } else {
        setError("No se encontró información del usuario en el localStorage.");
      }
      setIsLoading(false);
    };

    fetchUserById();
  }, []);

  const handleImageUpload = async (images: FileList) => {
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

        const imageUrl = await response.text();
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error("Error al subir una imagen:", error);
      }
    }

    return imageUrls;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setIsLoading(true);

      try {
        const uploadedImageUrls = await handleImageUpload(files);
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...uploadedImageUrls],
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number"
        ? parseFloat(value) || 0
        : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3002/property/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));

      if (!response.ok) {
        throw new Error("Error al actualizar la propiedad");
      }

      const data = await response.json();
      console.log("Propiedad actualizada:", data);

      Swal.fire("Éxito", "Propiedad actualizada con éxito", "success").then(() => {
        resetForm();
      });
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error);
      Swal.fire("Error", "No se pudo actualizar la propiedad", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const address = e.target.value;
    setFormData({ ...formData, address });

    if (address) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apiKey}`
        );
        const data = await response.json();
        const location = data.results[0]?.geometry.location;
        if (location) {
          setFormData((prevData) => ({
            ...prevData,
            latitude: location.lat,
            longitude: location.lng,
          }));
        }
      } catch (error) {
        console.error("Error al obtener las coordenadas:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Editar Propiedad
      </h2>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">
          Título de la Propiedad:
        </label>
        <input
          type="text"
          name="name"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Precio:</label>
        <input
          type="number"
          name="price"
          min="0"
          step="any"
          value={formData.price}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Pais:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Ciudad:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Dirección:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleAddressChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Habitaciones:</label>
        <input
          type="number"
          name="bedrooms"
          min="0"
          step="any"
          value={formData.bedrooms}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.bedrooms && (
          <p className="text-red-500 text-sm">{errors.bedrooms}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Baños:</label>
        <input
          type="number"
          name="bathrooms"
          min="0"
          step="any"
          value={formData.bathrooms}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.bathrooms && (
          <p className="text-red-500 text-sm">{errors.bathrooms}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Capacidad:</label>
        <input
          type="number"
          name="capacity"
          min="0"
          step="any"
          value={formData.capacity}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.capacity && (
          <p className="text-red-500 text-sm">{errors.capacity}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene wifi?</label>
        <input
          type="checkbox"
          name="wifi"
          checked={formData.wifi}
          onChange={handleChange}
          className="mt-2"
        />
        {errors.wifi && <p className="text-red-500 text-sm">{errors.wifi}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene TV?</label>
        <input
          type="checkbox"
          name="tv"
          checked={formData.tv}
          onChange={handleChange}
          className="mt-2"
        />
        {errors.tv && <p className="text-red-500 text-sm">{errors.tv}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">
          ¿Tiene aire acondicionado?
        </label>
        <input
          type="checkbox"
          name="airConditioning"
          checked={formData.airConditioning}
          onChange={handleChange}
          className="mt-2"
        />
        {errors.airConditioning && (
          <p className="text-red-500 text-sm">{errors.airConditioning}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene piscina?</label>
        <input
          type="checkbox"
          name="piscina"
          checked={formData.piscina}
          onChange={handleChange}
          className="mt-2"
        />
        {errors.piscina && (
          <p className="text-red-500 text-sm">{errors.piscina}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">
          ¿Tiene parqueadero?
        </label>
        <input
          type="checkbox"
          name="parqueadero"
          checked={formData.parqueadero}
          onChange={handleChange}
          className="mt-2"
        />
        {errors.parqueadero && (
          <p className="text-red-500 text-sm">{errors.parqueadero}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene cocina?</label>
        <input
          type="checkbox"
          name="cocina"
          checked={formData.cocina}
          onChange={handleChange}
          className="mt-2"
        />
        {errors.cocina && (
          <p className="text-red-500 text-sm">{errors.cocina}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">
          ¿Se permiten menores?
        </label>
        <input
          type="checkbox"
          name="hasMinor"
          checked={formData.hasMinor}
          onChange={handleChange}
          className="mt-2"
        />
        {errors.hasMinor && (
          <p className="text-red-500 text-sm">{errors.hasMinor}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">
          ¿Se permiten mascotas?
        </label>
        <input
          type="checkbox"
          name="pets"
          checked={formData.pets}
          onChange={handleChange}
          className="mt-2"
        />
        {errors.pets && <p className="text-red-500 text-sm">{errors.pets}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">
          Tipo de Propiedad:
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              type: e.target.value,
            }))
          }
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        >
          <option value="">Seleccione un tipo</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="habitacion">Habitación</option>
        </select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Imágenes:</label>
        <input
          type="file"
          multiple
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        {formData.images.length > 0 && (
          <div className="mt-2">
            <p className="text-gray-600">Imágenes seleccionadas:</p>
            <ul className="flex space-x-4">
              {formData.images.map((image, index) => (
                <li key={index} className="flex-shrink-0">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-16 h-16 object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-velvet hover:bg-[#1b276b] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {isLoading ? "Cargando..." : "Guardar Propiedad"}
      </button>
    </form>
  );
};

export default PropertyEditForm;
