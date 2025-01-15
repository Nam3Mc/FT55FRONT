const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserReservation = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/contract/user/${id}`, {
      next: { revalidate: 1200 },
    });

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error("Error en respuesta de getUserReservation:", errorDetails);
      throw new Error(
        `Fallo al realizar el fetch a las reservas del usuario: ${res.status} ${res.statusText}`
      );
    }

    const reservations = await res.json();
    return reservations;
  } catch (error: any) {
    console.error("Error en getUserReservation:", error.message || error);
    throw new Error("No se pudo obtener las reservas del usuario.");
  }
};

