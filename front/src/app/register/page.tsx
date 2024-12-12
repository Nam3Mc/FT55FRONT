"use client";
import { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: 0,
    nationality: "",
    dni: 0,
    DOB: "",
    civilStatus: "SINGLE",
    employmentStatus: "EMPLOYED",
    userName: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log(formData);

    try {
      const response = await fetch("http://localhost:3002/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar al usuario");
      }

      const data = await response.json();
      console.log("Usuario registrado exitosamente:", data);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg"
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
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700"
        >
          Teléfono
        </label>
        <input
          type="number"
          name="phone"
          id="phone"
          value={formData.phone}
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
          htmlFor="dni"
          className="block text-sm font-semibold text-gray-700"
        >
          DNI
        </label>
        <input
          type="number"
          name="dni"
          id="dni"
          value={formData.dni}
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
          htmlFor="civilStatus"
          className="block text-sm font-semibold text-gray-700"
        >
          Estado Civil
        </label>
        <select
          name="civilStatus"
          id="civilStatus"
          value={formData.civilStatus}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="SINGLE">Soltero</option>
          <option value="MARRIED">Casado</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="employmentStatus"
          className="block text-sm font-semibold text-gray-700"
        >
          Estado de Empleo
        </label>
        <select
          name="employmentStatus"
          id="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="EMPLOYED">Empleado</option>
          <option value="UNEMPLOYED">Desempleado</option>
          <option value="STUDENT">estudiante</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="userName"
          className="block text-sm font-semibold text-gray-700"
        >
          Nombre de Usuario
        </label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={formData.userName}
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
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-gray-700"
        >
          Confirmar Contraseña
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Registrar
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
