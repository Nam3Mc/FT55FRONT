"use client";
import { useEffect, useState } from "react";
import Navbar from "./nav";
import AdminNavbar from "./adminNavbar";
import { useAuthStore } from "@/store/authStore";

const RoleNavbar: React.FC = () => {
  const { user } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setIsAdmin(parsedUser.role === "admin" || parsedUser.role === "owner");
      } else {
        setIsAdmin(false);
      }
    };

    checkUserRole();
    window.addEventListener("storage", checkUserRole);

    return () => {
      window.removeEventListener("storage", checkUserRole);
    };
  }, [user]);

  if (isAdmin) {
    return <AdminNavbar />;
  }

  return <Navbar />;
};

export default RoleNavbar;
