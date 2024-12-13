/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type LoginData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Datos de login enviados:", loginData);

    try {
      const response = await fetch("http://localhost:3002/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 201) {
        const data = await response.json();

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión con éxito",
          text: `Bienvenido, ${data.user.email}!`,
          confirmButtonColor: "#3085d6",
        });
        router.push("/profile");
        return;
      }

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      const { token, user } = data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Credenciales incorrectas. Verifica tu email y contraseña.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="flex lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center bg-gray-200 h-full">
        <img
          src="https://i.postimg.cc/qBC7wtdC/pexels-rutger-van-rees-2147548108-29650203.jpg"
          alt="Imagen decorativa"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Inicia sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Ingresar
            </button>
            <button
              type="button"
              className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <span className="flex items-center">
                <FcGoogle />
                Ingresar con Google
              </span>
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-black">
                ¿No tienes cuenta?{" "}
                <Link href="/register">
                  <span className="text-blue-600 hover:underline">
                    Regístrate aquí
                  </span>
                </Link>
              </p>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-black">
                ¿Olvidaste tu contraseña?{" "}
                <Link href="/forgotPassword">
                  <span className="text-blue-600 hover:underline">
                    Recuperala aquí
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
