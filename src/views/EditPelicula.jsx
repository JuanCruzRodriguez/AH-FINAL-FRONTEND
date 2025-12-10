import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const EditPelicula = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    director: "",
    genero: "",
    anio: ""
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPelicula = async () => {
      try {
        const resp = await fetch(`http://127.0.0.1:3000/api/peliculas/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        const data = await resp.json();
        if (resp.ok) setForm(data.data);
        else setError(data.msg || "Error cargando película");
      } catch (err) {
        console.error(err);
        setError("Error del servidor");
      } finally {
        setLoading(false);
      }
    };
    getPelicula();
  }, [id, token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    const { titulo, descripcion, director, genero, anio } = form;
    if (!titulo || !descripcion || !director || !genero || !anio) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const resp = await fetch(`http://127.0.0.1:3000/api/peliculas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, anio: Number(form.anio) })
      });
      const data = await resp.json();

      if (!resp.ok) setError(data.msg || "No se pudo actualizar la película");
      else {
        setMensaje("Película actualizada correctamente");
        setTimeout(() => navigate("/peliculas"), 1200);
      }
    } catch (err) {
      console.error(err);
      setError("Error del servidor");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="mb-3 text-center">Editar Película</h3>

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
              placeholder="Título"
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
              placeholder="Descripción"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Director</label>
            <input
              type="text"
              name="director"
              value={form.director}
              onChange={handleChange}
              className="form-control"
              placeholder="Director"
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
              placeholder="Género"
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
              placeholder="Año"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/peliculas")}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPelicula;
