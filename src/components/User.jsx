import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const User = ({ u, onUserUpdated, onUserDeleted }) => {
  const { token, user: currentUser } = useContext(AuthContext);
  const [usuario, setUsuario] = useState(u);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setUsuario(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload = { name: usuario.name, email: usuario.email, role: usuario.role };
      const resp = await fetch(`http://127.0.0.1:3000/api/users/${usuario._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Error al actualizar usuario");
      onUserUpdated(usuario);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (currentUser.id === usuario._id) {
      alert("No puedes eliminarte a ti mismo");
      return;
    }
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    setLoading(true);
    try {
      const resp = await fetch(`http://127.0.0.1:3000/api/users/${usuario._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.ok) throw new Error("Error al eliminar usuario");
      onUserDeleted(usuario._id);
    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={usuario.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="form-control"
        />
      </td>
      <td>
        <input
          type="email"
          value={usuario.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="form-control"
        />
      </td>
      <td>
        <select
          value={usuario.role}
          onChange={(e) => handleChange("role", e.target.value)}
          className="form-select"
        >
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </td>
      <td>
        <button
          onClick={handleUpdate}
          className="btn btn-primary btn-sm me-2"
          disabled={loading}
        >
          Guardar
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
          disabled={loading || usuario._id === currentUser.id}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default User;
