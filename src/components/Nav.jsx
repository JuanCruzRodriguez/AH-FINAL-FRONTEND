import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handlerLogout = () => {
    if (window.confirm("¿Seguro que desea salir?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Mis Vistos
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/peliculas">
                    Películas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/series">
                    Series
                  </NavLink>
                </li>

                {user.role === "ADMIN" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/users">
                      Administrador de usuarios
                    </NavLink>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Registro
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {user && (
            <div className="d-flex align-items-center text-white">
              <div
                className="rounded-circle bg-secondary me-2"
                style={{ width: "35px", height: "35px" }}
              ></div>
              <NavLink to="/profile" className="me-3 text-white text-decoration-none">
                {user.email}
              </NavLink>
              <button className="btn btn-outline-light btn-sm" onClick={handlerLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
