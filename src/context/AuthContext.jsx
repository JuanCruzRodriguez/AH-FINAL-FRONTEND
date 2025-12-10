import { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Token inválido", error);
        setUser(null);
        localStorage.removeItem("jwt");
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = (token) => {
    localStorage.setItem("jwt", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
