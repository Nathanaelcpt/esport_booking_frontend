import React, { useState, useEffect } from "react";
import SeatGrid from "./components/SeatGrid";
import { fetchSeats, bookSeat } from "../utils/api";
import { connectWebSocket } from "../utils/websocket";

function BookingPage() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    async function loadSeats() {
      const data = await fetchSeats();
      setSeats(data);
    }

    loadSeats();

    const socket = connectWebSocket((message) => {
      const updatedSeat = JSON.parse(message);
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === updatedSeat.id ? { ...seat, ...updatedSeat } : seat
        )
      );
    });

    return () => socket.close();
  }, []);

  const handleSeatClick = async (seat) => {
    await bookSeat(seat.id);
    alert(`Seat ${seat.seatNumber} booked!`);
  };

  return (
    <div>
      <h1>Book Your Seat</h1>
      <SeatGrid seats={seats} onSeatClick={handleSeatClick} />
    </div>
  );
}

export default BookingPage;
