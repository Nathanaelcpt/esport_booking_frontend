import React from "react";

function Seat({ seat, onClick }) {
  return (
    <button
      className={`seat ${seat.isBooked ? "booked" : ""}`}
      onClick={() => onClick(seat)}
      disabled={seat.isBooked}
    >
      {seat.seatNumber}
    </button>
  );
}

export default Seat;
