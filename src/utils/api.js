const API_BASE = process.env.REACT_APP_API_BASE;

export async function fetchSeats() {
  const response = await fetch(`${API_BASE}/seats/1`);
  return response.json();
}

export async function bookSeat(seatId) {
  const response = await fetch(`${API_BASE}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ seat_id: seatId }),
  });

  if (!response.ok) {
    throw new Error("Failed to book seat");
  }

  return response.json();
}
