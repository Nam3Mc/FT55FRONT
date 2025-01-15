import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { TypeOfProperty } from "@/helpers/typeOfProperty";
import IFormData from "../../interfaces/formData";
import IUser from "@/interfaces/user";
import { IPropiedad } from "@/interfaces/properties";
import { PropertyStatus } from "@/helpers/statusProperty";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UsePropertyFormProps {
  property: IPropiedad;
}

const usePropertyForm = ({ property }: UsePropertyFormProps) => {
    const [formData, setFormData] = useState<IFormData>({
      name: property.name || "",
      description: property.description || "",
      price: property.price || 1,
      state: property.state || "",
      city: property.city || "",
      country: property.country || "",
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
      isActive: property.isActive || PropertyStatus.PENDING,
      type: property.type || "casa",
    });
  
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const { propertyId } = useParams();
  
    useEffect(() => {
      const fetchProperty = async () => {
        if (!propertyId) return;
  
        setIsLoading(true);
        try {
          const response = await fetch(
            `${API_URL}/property/unique/${propertyId}`
          );
          if (!response.ok) throw new Error("Error al obtener la propiedad");
          const fetchedProperty = await response.json();
          setFormData(fetchedProperty);
        } catch (error) {
          setError("No se pudo obtener la propiedad.");
        } finally {
          setIsLoading(false);
        }
      };
  
      if (propertyId) fetchProperty();
    }, [propertyId]);
  
    useEffect(() => {
      const fetchUserById = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setError("No se encontró información del usuario en el localStorage.");
          return;
        }
        const userData = JSON.parse(storedUser);
        const userId = userData.id;
  
        try {
          const response = await fetch(`${API_URL}/users/${userId}`);
          if (!response.ok) throw new Error("Error al obtener el usuario");
          const fetchedUser = await response.json();
          setUser(fetchedUser);
          setFormData((prevData) => ({
            ...prevData,
            accountId: fetchedUser.account_.id,
          }));
        } catch (error) {
          setError("No se pudo obtener la información del usuario.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUserById();
    }, []);
  
    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
  
      if (!formData.name) {
        newErrors.title = "El título no debe estar vacío";
      } else if (formData.name.length < 8) {
        newErrors.title = "El título debe tener al menos 8 caracteres";
      } else if (formData.name.length > 50) {
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
      if (typeof formData.bedrooms !== "number" || formData.bedrooms < 1) {
        newErrors.bedrooms = "El número de habitaciones debe ser positivo";
      }
      if (typeof formData.bathrooms !== "number" || formData.bathrooms < 1) {
        newErrors.bathrooms = "El número de baños debe ser positivo";
      }
      if (typeof formData.capacity !== "number" || formData.capacity < 1) {
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
  
    const handleSubmit = async () => {
      if (!validateForm()) return;
  
      setIsLoading(true);
      try {
        const payload = {
          ...formData,
          id: property.id,
          images: formData.images.map((image) =>
            typeof image === "string" ? image : image
          ),
        };
  
        const response = await fetch(`${API_URL}/property/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) throw new Error("Error al actualizar la propiedad");
  
        Swal.fire("Éxito", "Propiedad actualizada con éxito", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar la propiedad", "error");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value, type } = e.target;
      const parsedValue =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseFloat(value) || 0
          : value;
  
      setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    };
  
    const resetForm = () => {
      setFormData({
        name: "",
        description: "",
        price: 1,
        state: "",
        city: "",
        country: "",
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
        isActive: PropertyStatus.PENDING,
        type: "casa",
      });
    };
  
    const handleImageUpload = async (images: FileList) => {
      const imageUrls: string[] = [];
  
      for (const file of Array.from(images)) {
        const formData = new FormData();
        formData.append("file", file);
  
        try {
          const response = await fetch(`${API_URL}/image`, {
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
  
    const handleAddressChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const address = e.target.value;
      setFormData({ ...formData, address });
  
      if (address) {
        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
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
  
    const handleDeleteImage = (imageId: string, index: number) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Una vez eliminada, no podrás recuperarla!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarla",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setFormData((prevState) => {
              const updatedImages = prevState.images.filter((_, i) => i !== index);
              return { ...prevState, images: updatedImages };
            });
  
            Swal.fire("Eliminada!", "La imagen ha sido eliminada correctamente.", "success");
          } catch (error) {
            Swal.fire("Error", "Hubo un problema al eliminar la imagen", "error");
          }
        } else {
          Swal.fire("Cancelada", "La imagen no ha sido eliminada.", "info");
        }
      });
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const imageURLs = files.map((file) => {
        if (file instanceof Blob) {
          return URL.createObjectURL(file);
        } else {
          throw new Error("Archivo no válido");
        }
      });
  
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...imageURLs],
      }));
    };
  
    return {
      formData,
      setFormData,
      errors,
      isLoading,
      handleChange,
      handleSubmit,
      resetForm,
      handleImageUpload,
      handleAddressChange,
      handleDeleteImage,
      handleFileChange,
    };
  };
  export default usePropertyForm;
  

// const usePropertyForm = ({ property }: UsePropertyFormProps) => {
//   const [formData, setFormData] = useState<IFormData>({
//     name: property.name || "",
//     description: property.description || "",
//     price: property.price || 1,
//     state: property.state || "",
//     city: property.city || "",
//     country: property.country || "",
//     bedrooms: property.bedrooms || 1,
//     bathrooms: property.bathrooms || 1,
//     capacity: property.capacity || 1,
//     latitude: property.latitude || 0,
//     longitude: property.longitude || 0,
//     hasMinor: property.hasMinor || false,
//     pets: property.pets || false,
//     accountId: property.accountId || "",
//     images: property.image_
//       ? property.image_.map((img: { url: string }) => img.url)
//       : [],
//     address: property.address || "",
//     wifi: property.wifi || false,
//     tv: property.amenities_?.tv || false,
//     airConditioning: property.amenities_?.airConditioning || false,
//     piscina: property.amenities_?.piscina || false,
//     parqueadero: property.amenities_?.parqueadero || false,
//     cocina: property.amenities_?.cocina || false,
//     isActive: property.isActive || false,
//     type: property.type || "casa",
//   });

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [user, setUser] = useState<IUser | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const { propertyId } = useParams();

//   useEffect(() => {
//     const fetchProperty = async () => {
//       if (!propertyId) return;

//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `http://localhost:3002/property/unique/${propertyId}`
//         );
//         if (!response.ok) throw new Error("Error al obtener la propiedad");
//         const fetchedProperty = await response.json();
//         setFormData(fetchedProperty);
//       } catch (error) {
//         setError("No se pudo obtener la propiedad.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (propertyId) fetchProperty();
//   }, [propertyId]);

//   useEffect(() => {
//     const fetchUserById = async () => {
//       const storedUser = localStorage.getItem("user");
//       if (!storedUser) {
//         setError("No se encontró información del usuario en el localStorage.");
//         return;
//       }
//       const userData = JSON.parse(storedUser);
//       const userId = userData.id;

//       try {
//         const response = await fetch(`http://localhost:3002/users/${userId}`);
//         if (!response.ok) throw new Error("Error al obtener el usuario");
//         const fetchedUser = await response.json();
//         setUser(fetchedUser);
//         setFormData((prevData) => ({
//           ...prevData,
//           accountId: fetchedUser.account_.id,
//         }));
//       } catch (error) {
//         setError("No se pudo obtener la información del usuario.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserById();
//   }, []);

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};

//     if (!formData.name) {
//       newErrors.title = "El título no debe estar vacío";
//     } else if (formData.name.length < 8) {
//       newErrors.title = "El título debe tener al menos 8 caracteres";
//     } else if (formData.name.length > 50) {
//       newErrors.title = "El título debe tener un máximo de 50 caracteres";
//     }

//     if (typeof formData.price !== "number" || formData.price <= 0) {
//       newErrors.price = "El precio debe ser un número positivo";
//     }

//     if (!formData.state) {
//       newErrors.state = "La provincia no debe estar vacía";
//     }
//     if (!formData.city) {
//       newErrors.city = "La ciudad no debe estar vacía";
//     }
//     if (typeof formData.bedrooms !== "number" || formData.bedrooms < 1) {
//       newErrors.bedrooms = "El número de habitaciones debe ser positivo";
//     }
//     if (typeof formData.bathrooms !== "number" || formData.bathrooms < 1) {
//       newErrors.bathrooms = "El número de baños debe ser positivo";
//     }
//     if (typeof formData.capacity !== "number" || formData.capacity < 1) {
//       newErrors.capacity = "La capacidad debe ser positiva";
//     }

//     if (typeof formData.wifi !== "boolean") {
//       newErrors.wifi = "El campo wifi debe ser un valor booleano";
//     }
//     if (typeof formData.tv !== "boolean") {
//       newErrors.tv = "El campo tv debe ser un valor booleano";
//     }
//     if (typeof formData.airConditioning !== "boolean") {
//       newErrors.airConditioning =
//         "El campo aire acondicionado debe ser un valor booleano";
//     }
//     if (typeof formData.piscina !== "boolean") {
//       newErrors.piscina = "El campo piscina debe ser un valor booleano";
//     }
//     if (typeof formData.parqueadero !== "boolean") {
//       newErrors.parqueadero = "El campo parqueadero debe ser un valor booleano";
//     }
//     if (typeof formData.cocina !== "boolean") {
//       newErrors.cocina = "El campo cocina debe ser un valor booleano";
//     }
//     if (!Object.values(TypeOfProperty).includes(formData.type)) {
//       newErrors.type = "Selecciona un tipo de propiedad válido";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     const parsedValue =
//       type === "checkbox"
//         ? (e.target as HTMLInputElement).checked
//         : type === "number"
//         ? parseFloat(value) || 0
//         : value;
//     setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
//   };

//   // Handle form reset
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       price: 1,
//       state: "",
//       city: "",
//       country: "",
//       bedrooms: 1,
//       bathrooms: 1,
//       capacity: 1,
//       latitude: 0,
//       longitude: 0,
//       hasMinor: false,
//       pets: false,
//       accountId: "",
//       images: [],
//       address: "",
//       wifi: false,
//       tv: false,
//       airConditioning: false,
//       piscina: false,
//       parqueadero: false,
//       cocina: false,
//       isActive: false,
//       type: "casa",
//     });
//   };
//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         id: property.id,
//         images: formData.images.map((image) =>
//           typeof image === "string" ? image : image
//         ),
//       };

//       const response = await fetch("http://localhost:3002/property/update", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error("Error al actualizar la propiedad");

//       Swal.fire("Éxito", "Propiedad actualizada con éxito", "success");
//     } catch (error) {
//       Swal.fire("Error", "No se pudo actualizar la propiedad", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value, type } = e.target;
// //     const parsedValue =
// //       type === "checkbox"
// //         ? (e.target as HTMLInputElement).checked
// //         : type === "number"
// //         ? parseFloat(value) || 0
// //         : value;

// //     setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
// //   };

// const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     const parsedValue =
//       type === "checkbox"
//         ? (e.target as HTMLInputElement).checked
//         : type === "number"
//         ? parseFloat(value) || 0
//         : value;
  
//     setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
//   };
  
  

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       price: 1,
//       state: "",
//       city: "",
//       country: "",
//       bedrooms: 1,
//       bathrooms: 1,
//       capacity: 1,
//       latitude: 0,
//       longitude: 0,
//       hasMinor: false,
//       pets: false,
//       accountId: "",
//       images: [],
//       address: "",
//       wifi: false,
//       tv: false,
//       airConditioning: false,
//       piscina: false,
//       parqueadero: false,
//       cocina: false,
//       isActive: false,
//       type: "casa",
//     });
//   };

//   return {
//     formData,
//     errors,
//     isLoading,
//     handleChange,
//     handleSubmit,
//     resetForm,
//   };
// };

// export default usePropertyForm;
