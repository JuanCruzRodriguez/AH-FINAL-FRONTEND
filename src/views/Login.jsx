import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Alert from "../components/Alert";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await fetch("http://127.0.0.1:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Error en login");
        return;
      }

      login(data.token);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Error en el servidor");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" ref={emailRef} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input type="password" ref={passwordRef} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
          {error && <Alert msg={error} />}
        </form>
      </div>
    </div>
  );
};

export default Login;
