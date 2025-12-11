import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Pelicula from "../components/Pelicula";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Peliculas = () => {
  const { token } = useContext(AuthContext);
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPeliculas = async () => {
    try {
      const res = await fetch("https://ah-final-backend.onrender.com/api/peliculas", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setPeliculas(data.data);
      else setError(data.msg || "Error al obtener películas");
    } catch (err) {
      console.error(err);
      setError("Error en la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const eliminarPelicula = async (id) => {
    try {
      const res = await fetch(`https://ah-final-backend.onrender.com/api/peliculas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setPeliculas((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorito = async (id) => {
    try {
      const res = await fetch(`https://ah-final-backend.onrender.com/api/peliculas/${id}/favorito`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPeliculas((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, favorita: !p.favorita } : p
          )
        );
      } else {
        console.error(data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPeliculas();
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className="container min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Películas</h2>
        <Link to="/peliculas/add" className="btn btn-primary">
          Nueva Película
        </Link>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <ul className="peliculas-list list-unstyled">
        {peliculas.map((pel) => (
          <Pelicula 
            key={pel._id} 
            {...pel} 
            eliminarPelicula={eliminarPelicula} 
            toggleFavorito={() => toggleFavorito(pel._id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Peliculas;
