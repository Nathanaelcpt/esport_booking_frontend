import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/axios"; // Import axios instance

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Periksa apakah token valid
          await api.get("/protected", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (err) {
          // Jika token tidak valid atau expired
          setIsAuthenticated(false);
          localStorage.removeItem("token"); // Hapus token yang tidak valid
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated) {
    return children; // Tampilkan komponen yang dilindungi jika sudah terautentikasi
  } else {
    return <Navigate to="/login" />; // Arahkan ke halaman login jika tidak ada token atau token invalid
  }
};

export default ProtectedRoute;
