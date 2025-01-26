import React from "react";
import Seat from "./Seat";

function SeatGrid({ seats, onSeatClick }) {
  return (
    <div className="seat-grid">
      {seats.map((seat) => (
        <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
      ))}
    </div>
  );
}

export default SeatGrid;
