/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

        setUser(data.user);

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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Credenciales incorrectas. Verifica tu email y contraseña.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    const token = response.credential;

    if (!token) {
      console.error("Token de Google no recibido.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3002/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión con Google exitoso",
          text: `Bienvenido, ${data.user.email}!`,
          confirmButtonColor: "#3085d6",
        });
        router.push("/profile");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Error en el login con Google.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un error al iniciar sesión con Google, ${error}`,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/j5YLMPFX/pexels-pixabay-417289.jpg')",
      }}
    >
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
          <div className="flex flex-col space-y-2 relative">
            <label className="text-sm font-medium text-black">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error en el inicio de sesión con Google.",
                confirmButtonColor: "#d33",
              });
            }}
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-black">
            ¿No tienes cuenta?{" "}
            <Link href="/register">
              <span className="text-blue-600 hover:underline">
                Regístrate aquí
              </span>
            </Link>
          </p>
          <p className="text-sm text-black mt-2">
            ¿Olvidaste tu contraseña?{" "}
            <Link href="/forgotPassword">
              <span className="text-blue-600 hover:underline">
                Recuperala aquí
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
