import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Vistas generales
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Profile from "./views/Profile";

// Películas
import Peliculas from "./views/Peliculas";
import AddPelicula from "./views/AddPelicula";
import EditPelicula from "./views/EditPelicula";

// Series
import Series from "./views/Series";
import AddSerie from "./views/AddSerie";
import EditSerie from "./views/EditSerie";

// Users
import AdminUsers from "./views/AdminUsers";
import AdminRoute from "./auth/AdminRoute";

// Layout
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Protección de rutas
import ProtectedRoute from "./auth/ProtectedRoute";

function AppRoutes() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {/* Login y registro */}
      <Route
        path="/login"
        element={token ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route
        path="/"
        element={token ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route path="/register" element={<Register />} />

      {/* Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Perfil */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Películas */}
      <Route
        path="/peliculas"
        element={
          <ProtectedRoute>
            <Peliculas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/peliculas/add"
        element={
          <ProtectedRoute>
            <AddPelicula />
          </ProtectedRoute>
        }
      />
      <Route
        path="/peliculas/:id/edit"
        element={
          <ProtectedRoute>
            <EditPelicula />
          </ProtectedRoute>
        }
      />

      {/* Series */}
      <Route
        path="/series"
        element={
          <ProtectedRoute>
            <Series />
          </ProtectedRoute>
        }
      />
      <Route
        path="/series/add"
        element={
          <ProtectedRoute>
            <AddSerie />
          </ProtectedRoute>
        }
      />
      <Route
        path="/series/:id/edit"
        element={
          <ProtectedRoute>
            <EditSerie />
          </ProtectedRoute>
        }
      />

      {/* Users (solo admins) */}
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
