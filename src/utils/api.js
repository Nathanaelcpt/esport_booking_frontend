import api from "./axios"; // Menggunakan axios instance

export const fetchSeats = async () => {
  try {
    const response = await api.get("/seats");
    return response.data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    return [];
  }
};

export const bookSeat = async (seatId) => {
  try {
    const token = localStorage.getItem("token");
    await api.post(
      "/book",
      { seatId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error booking seat:", error);
  }
};
