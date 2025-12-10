import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>No se encontraron datos del usuario.</p>;

  return (
    <div className="container mt-5">
      <h2>Mi Perfil</h2>
      <div className="card p-4 shadow" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <strong>Nombre:</strong> {user.name || "-"}
        </div>
        <div className="mb-3">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-3">
          <strong>Rol:</strong> {user.role}
        </div>
      </div>
    </div>
  );
};

export default Profile;
