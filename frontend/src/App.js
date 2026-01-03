import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [personas, setPersonas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/personas/";

  // Obtener listado de personas
  const fetchPersonas = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setPersonas(res.data);
    } catch (err) {
      setError("Error al cargar personas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validaciones
    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      setLoading(false);
      return;
    }
    if (!edad || isNaN(edad) || edad < 0 || edad > 120) {
      setError("La edad debe ser un número entre 0 y 120");
      setLoading(false);
      return;
    }

    try {
      await axios.post(API_URL, { nombre, edad: parseInt(edad) });
      setNombre("");
      setEdad("");
      fetchPersonas();
      setSuccess("Persona agregada correctamente");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      if (err.response && err.response.data) {
        // Mostrar errores de DRF de forma legible
        const messages = Object.entries(err.response.data)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");
        setError(messages || "Error al agregar persona");
      } else {
        setError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h1>Registro de Personas</h1>

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "20px", opacity: loading ? 0.6 : 1 }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Agregar Persona"}
        </button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Listado de Personas</h2>
      {loading && personas.length === 0 ? (
        <p>Cargando personas...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {personas.map((p) => (
            <div
              key={p.id}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
                boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
                transition: "0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9f9f9")
              }
            >
              <strong>{p.nombre}</strong> ({p.edad} años)
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
