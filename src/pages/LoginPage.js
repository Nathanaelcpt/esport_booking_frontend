import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios"; // Import axios instance

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Mengirimkan data login ke backend
      const response = await api.post("/login", { email: email, password });

      // Menyimpan token yang diterima di localStorage
      localStorage.setItem("token", response.data.token);

      // Mengarahkan pengguna ke halaman booking setelah login berhasil
      navigate("/");
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
