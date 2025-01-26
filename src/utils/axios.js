import axios from "axios";

// Ganti dengan URL backend Anda jika berbeda
const api = axios.create({
  baseURL: "http://localhost:3001/", // URL Backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
