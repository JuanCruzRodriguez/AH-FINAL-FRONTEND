import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EditUser = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    rol: "user",
    image: "",
    password1: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError("");
    setMensaje("");
  };

  const validar = () => {
    if (!user.name.trim()) return "El nombre es obligatorio";
    if (!user.email.trim()) return "El email es obligatorio";
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(user.email)) return "El email no es válido";

    if (user.password1 || user.password2) {
      if (user.password1.length < 4)
        return "La contraseña debe tener al menos 4 caracteres";
      if (user.password1 !== user.password2)
        return "Las contraseñas no coinciden";
    }
    return null;
  };

  const endPoint = `https://ah-final-backend.onrender.com/api/users/${id}`;

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await fetch(endPoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await resp.json();
        const { name, email, rol, image } = data.data;
        setUser({ name, email, rol, image, password1: "", password2: "" });
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorValid = validar();
    if (errorValid) {
      setError(errorValid);
      return;
    }

    setLoading(true);

    const payload = {
      name: user.name,
      email: user.email,
      rol: user.rol,
      image: user.image,
    };
    if (user.password1) payload.password = user.password1;

    try {
      const resp = await fetch(endPoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Error al actualizar usuario");
      setMensaje("Usuario actualizado correctamente");
      setTimeout(() => navigate("/users"), 1200);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-4">Editar Usuario</h3>

              {error && <div className="alert alert-danger">{error}</div>}
              {mensaje && <div className="alert alert-success">{mensaje}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <select
                    name="rol"
                    value={user.rol}
                    onChange={onChange}
                    className="form-select"
                  >
                    <option value="USER">Usuario</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">URL Imagen</label>
                  <input
                    type="text"
                    name="image"
                    value={user.image}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nueva contraseña (opcional)</label>
                  <input
                    type="password"
                    name="password1"
                    value={user.password1}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Repetir contraseña</label>
                  <input
                    type="password"
                    name="password2"
                    value={user.password2}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  Guardar
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/users")}
                  className="btn btn-secondary w-100 mt-2"
                  disabled={loading}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
