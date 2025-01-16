"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "../../components/admindashboard/AdminDashboard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userString = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!userString || !token) {
          router.push("/login");
          return;
        }

        const user = JSON.parse(userString); 
        const userId = user.id; 

        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos del usuario");
        }

        const userData = await response.json();
        const userRole = userData?.account_?.role;

        if (userRole === "admin" || userRole === "owner") {
          setIsAuthorized(true);
        } else {
          router.push("/unauthorized");
        }
      } catch (error) {
        console.error("Error al verificar el rol del usuario:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!isAuthorized) {
    return null;
  }

  return <AdminDashboard />;
};

export default ProfilePage;