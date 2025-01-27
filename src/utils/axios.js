import axios from "axios";

// Ganti dengan URL backend Anda jika berbeda
const api = axios.create({
  baseURL: "https://esportbookingbackend-production.up.railway.app", // URL Backend Anda
  // baseURL: "http://localhost:3001/", // URL Backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
