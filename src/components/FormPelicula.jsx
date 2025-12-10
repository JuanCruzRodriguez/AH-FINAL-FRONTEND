import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FormPelicula = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ titulo: "", genero: "", anio: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchPelicula = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/api/peliculas/${id}`);
        const data = await res.json();
        if (res.ok)
          setForm({
            titulo: data.data.titulo,
            genero: data.data.genero,
            anio: data.data.anio,
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchPelicula();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.titulo || !form.genero || !form.anio) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const url = id
        ? `http://127.0.0.1:3000/api/peliculas/${id}`
        : "http://127.0.0.1:3000/api/peliculas";
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al guardar la película");
      navigate("/peliculas");
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar la película");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={onSubmit} className="p-4 border rounded shadow" style={{ minWidth: "300px", backgroundColor: "#f8f9fa" }}>
        <h2 className="text-center mb-4">{id ? "Editar Película" : "Nueva Película"}</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" name="titulo" value={form.titulo} onChange={onChange} type="text" />
        </div>

        <div className="mb-3">
          <label className="form-label">Género</label>
          <input className="form-control" name="genero" value={form.genero} onChange={onChange} type="text" />
        </div>

        <div className="mb-3">
          <label className="form-label">Año</label>
          <input className="form-control" name="anio" value={form.anio} onChange={onChange} type="number" />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default FormPelicula;
