import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div>Cargando...</div>; // o spinner

  return token ? children : <Navigate to='/' replace />;
}


export default ProtectedRoute
