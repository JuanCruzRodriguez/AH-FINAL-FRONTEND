import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5 min-vh-100">
      <h1 className="mb-5 mt-5 display-5">Agregá todas tus películas y series vistas</h1>
      
      <p className="mb-5 lead">
        Organizá tus favoritas y no pierdas nunca de vista lo que ya viste.
      </p>

      <div className="d-flex justify-content-center gap-4 flex-wrap">
        <button
          className="btn btn-primary btn-lg px-5 py-3 fs-4"
          onClick={() => navigate("/peliculas")}
        >
          Películas
        </button>

        <button
          className="btn btn-success btn-lg px-5 py-3 fs-4"
          onClick={() => navigate("/series")}
        >
          Series
        </button>
      </div>
    </div>
  );
};

export default Home;
