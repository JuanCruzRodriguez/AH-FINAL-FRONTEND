import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { token, user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role.toUpperCase() !== "ADMIN") {
    return <p>No tienes permisos para acceder a esta sección.</p>;
  }

  return children;
};

export default AdminRoute;
