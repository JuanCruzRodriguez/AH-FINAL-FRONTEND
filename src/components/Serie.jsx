import { Link } from "react-router-dom";

const Serie = ({ _id, titulo, genero, temporadas, favorita, anio, eliminarSerie, toggleFavorito }) => {
  return (
    <div className="card mb-3 shadow-sm" style={{ maxWidth: '540px' }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">
            <small className="text-muted">{genero} | {temporadas} temporadas | {anio}</small>
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            onClick={() => toggleFavorito(_id)}
            className={`btn btn-sm ${favorita ? "btn-warning" : "btn-outline-warning"}`}
          >
            <i className="fa-solid fa-star"></i>
          </button>

          <Link to={`/series/${_id}/edit`} className="btn btn-outline-primary btn-sm">
            <i className="fa-regular fa-edit"></i>
          </Link>

          <button onClick={() => eliminarSerie(_id)} className="btn btn-outline-danger btn-sm">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Serie;
