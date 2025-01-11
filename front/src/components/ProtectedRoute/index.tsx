"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "No autorizado",
        text: "Por favor, inicia sesión para acceder a esta página.",
      }).then(() => {
        router.push("/login");
      });
    } else {
      const parsedUser = JSON.parse(user);
      if (!parsedUser.isActive) {
        Swal.fire({
          icon: "warning",
          title: "Usuario inactivo",
          text: "Su usuario está inactivo. Por favor, comuníquese con soporte.",
        }).then(() => {
          router.push("/login");
        });
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
