"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    dni: "",
    DOB: "",
    civilStatus: "",
    employmentStatus: "",
    password: "",
    confirmPassword: "",
    role: "user",
    photo: "",
  });
  const [showpassword, setShowpassword] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, confirmPassword, DOB } = formData;

    if (formData.name.length < 2 || formData.lastName.length < 2) {
      alert("El nombre y el apellido deben tener al menos 2 caracteres.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const formDataWithNumbers = {
      ...formData,
      DOB: DOB.toString(),
    };

    try {
<<<<<<< HEAD
      const response = await fetch("https://rentafacil.onrender.com/users", {
=======
      const response = await fetch(`${API_URL}/users`, {
>>>>>>> 31c41c1a7b3d020d19d4d22d35bdb67e1fe7cd04
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithNumbers),
      });
      console.log(response)

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Detalles del error:", errorData);
        throw new Error("Error al registrar al usuario");
      }

      const data = await response.json();
      console.log("Usuario registrado exitosamente:", data);

      Swal.fire("Éxito", "Usuario registrado exitosamente", "success").then(
        () => {
          router.push("/login");
        }
      );
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div
      className="min-h-screen-83 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/3RnqJCmr/pexels-chris-schippers-139261-421927.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-10 bg-white rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-gray-700"
          >
            Apellido
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nationality"
            className="block text-sm font-semibold text-gray-700"
          >
            Nacionalidad
          </label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="DOB"
            className="block text-sm font-semibold text-gray-700"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            name="DOB"
            id="DOB"
            value={formData.DOB}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowpassword(!showpassword)}
              className="absolute right-2 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showpassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-gray-700"
          >
            Confirmar Contraseña
          </label>
          <div className="relative">
            <input
              type={showpassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowpassword(!showpassword)}
              className="absolute right-2 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showpassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <button className="w-full py-2 bg-velvet text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
