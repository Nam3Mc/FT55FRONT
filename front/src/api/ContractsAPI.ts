const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserReservation = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/contract/user/${id}`, {
      next: { revalidate: 1200 },
    });

    if (!res.ok) {
      throw new Error(
        `Fallo al realizar el fetch a las reservas del usuario: ${res.status} ${res.statusText}`
      );
    }

    const reservations = res;
    return reservations;
  } catch (error: any) {
    console.error("Error en getUserReservation:", error.message || error);
    throw new Error("No se pudo obtener las reservas del usuario.");
  }
};
