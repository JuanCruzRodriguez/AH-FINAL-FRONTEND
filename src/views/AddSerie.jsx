import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const AddSerie = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    genero: "",
    anio: "",
    temporadas: ""
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    const { titulo, descripcion, genero, anio, temporadas } = form;
    if (!titulo || !descripcion || !genero || !anio || !temporadas) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:3000/api/series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({...form, anio: Number(form.anio), temporadas: Number(form.temporadas)}),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Error al crear la serie");
      } else {
        setMensaje("Serie creada correctamente");
        setTimeout(() => navigate("/series"), 1200);
      }
    } catch (err) {
      console.error(err);
      setError("Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="mb-3 text-center">Agregar nueva serie</h3>

        {loading && <Loading />}
        {error && <div className="alert alert-danger">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Breaking Bad"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Historia de un químico..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Género</label>
            <input
              type="text"
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Drama"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Año</label>
            <input
              type="number"
              name="anio"
              value={form.anio}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: 2008"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Temporadas</label>
            <input
              type="number"
              name="temporadas"
              value={form.temporadas}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: 5"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Crear serie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSerie;
