import { useState, useEffect } from "react";
import IUser from "../../interfaces/user";

const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3002/users");
        if (!response.ok) {
          throw new Error("Error al cargar los usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleActivate = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3002/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al activar el usuario");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, active: true } : user
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDesactivate = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3002/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al desactivar el usuario");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, active: false } : user
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { users, loading, error, handleActivate, handleDesactivate };
};

export default useUsers;
