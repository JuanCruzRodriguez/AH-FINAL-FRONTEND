import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FormSerie = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ titulo: "", genero: "", temporadas: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchSerie = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/api/series/${id}`);
        const data = await res.json();
        if (res.ok)
          setForm({
            titulo: data.data.titulo,
            genero: data.data.genero,
            temporadas: data.data.temporadas,
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchSerie();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.titulo || !form.genero || !form.temporadas) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const url = id
        ? `http://127.0.0.1:3000/api/series/${id}`
        : "http://127.0.0.1:3000/api/series";
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al guardar la serie");
      navigate("/series");
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar la serie");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={onSubmit}
        className="p-4 border rounded shadow"
        style={{ minWidth: "300px", backgroundColor: "#f8f9fa" }}
      >
        <h2 className="text-center mb-4">{id ? "Editar Serie" : "Nueva Serie"}</h2>

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
          <label className="form-label">Temporadas</label>
          <input className="form-control" name="temporadas" value={form.temporadas} onChange={onChange} type="number" />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default FormSerie;
