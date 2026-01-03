import React from "react";

function PersonaList({ personas, loading }) {
  if (loading) return <p>Cargando personas...</p>;
  if (personas.length === 0) return <p>No hay personas registradas.</p>;

  return (
    <ul>
      {personas.map((p) => (
        <li key={p.id}>
          {p.nombre} ({p.edad} años)
        </li>
      ))}
    </ul>
  );
}

export default PersonaList;
