import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Serie from "../components/Serie";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Series = () => {
  const { token } = useContext(AuthContext);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSeries = async () => {
    try {
      const res = await fetch("https://ah-final-backend.onrender.com/api/series", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setSeries(data.data);
      else setError(data.msg || "Error obteniendo series");
    } catch (err) {
      console.error(err);
      setError("Error en la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const eliminarSerie = async (id) => {
    try {
      const res = await fetch(`https://ah-final-backend.onrender.com/api/series/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setSeries((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorito = async (id) => {
    try {
      const res = await fetch(`https://ah-final-backend.onrender.com/api/series/${id}/favorito`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
      const data = await res.json();
      if (res.ok) {
        setSeries((prev) =>
          prev.map((s) =>
            s._id === id ? { ...s, favorita: !s.favorita } : s
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
    fetchSeries();
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className="container min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Series</h2>
        <Link to="/series/add" className="btn btn-primary">
          Nueva Serie
        </Link>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <ul className="series-list list-unstyled">
        {series.map((serie) => (
          <Serie 
            key={serie._id} 
            {...serie} 
            eliminarSerie={eliminarSerie} 
            toggleFavorito={() => toggleFavorito(serie._id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Series;
