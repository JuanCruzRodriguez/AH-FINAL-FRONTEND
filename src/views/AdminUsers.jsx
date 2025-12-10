import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import User from "../components/User";

const AdminUsers = () => {
  const { token, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;

    const fetchUsers = async () => {
      try {
        const resp = await fetch("http://127.0.0.1:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await resp.json();
        setUsers(data.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar usuarios");
      }
    };

    fetchUsers();
  }, [token, user]);

  const handleUserUpdated = (updatedUser) => {
    setUsers(prev =>
      prev.map(u => (u._id === updatedUser._id ? updatedUser : u))
    );
    setMensaje("Usuario actualizado correctamente");
    setTimeout(() => setMensaje(""), 1500);
  };

  const handleUserDeleted = (id) => {
    setUsers(prev => prev.filter(u => u._id !== id));
    setMensaje("Usuario eliminado correctamente");
    setTimeout(() => setMensaje(""), 1500);
  };

  if (!user || user.role !== "ADMIN") {
    return <p>No tienes permisos para acceder a esta sección.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Panel de Administración de Usuarios</h2>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <User
              key={u._id}
              u={u}
              onUserUpdated={handleUserUpdated}
              onUserDeleted={handleUserDeleted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
