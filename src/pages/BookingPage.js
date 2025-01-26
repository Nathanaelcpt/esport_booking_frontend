import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SeatGrid from "../components/SeatGrid";
import { fetchSeats, bookSeat } from "../utils/api"; // API helper functions
import { connectWebSocket } from "../utils/websocket"; // WebSocket connection

// Fungsi untuk mengambil data tournament
async function fetchTournaments() {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/tournaments", {
    headers: {
      Authorization: `Bearer ${token}`, // Menambahkan JWT token ke header
    },
  });
  const data = await response.json();
  console.log(data); // Log data untuk melihat respons
  return data;
}

function BookingPage() {
  const [seats, setSeats] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mengecek token JWT sebelum memuat halaman
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Arahkan ke halaman login jika token tidak ada
      return;
    }

    // Mengambil data tournament dari backend
    async function loadTournaments() {
      const data = await fetchTournaments();
      setTournaments(data);
    }

    loadTournaments();
  }, [navigate]);

  const handleSeatClick = async (seat) => {
    try {
      await bookSeat(seat.id); // Mengirimkan request untuk memesan kursi
      alert(`Seat ${seat.seatNumber} booked!`);
    } catch (err) {
      console.error("Error booking seat:", err);
      alert("There was an error booking the seat.");
    }
  };

  return (
    <div>
      <h1>Book Your Seat</h1>
      {/* <SeatGrid seats={seats} onSeatClick={handleSeatClick} /> */}

      {/* Tabel Tournament */}
      <h2>Tournaments</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <td>{tournament.name}</td>
              <td>{tournament.description}</td>
              <td>{new Date(tournament.start_date).toLocaleString()}</td>
              <td>{new Date(tournament.end_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingPage;
