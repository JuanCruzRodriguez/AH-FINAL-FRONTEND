import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert';
import Loading from '../components/Loading';

const Register = () => {
  const navigate = useNavigate(); 
  const endPoint = 'https://ah-final-backend.onrender.com/api/users/register';

  const [ error, setError ] = useState(false);
  const [ msgError, setMsgError ] = useState('');
  const [ loading, setLoading ] = useState(false); 
  const [ form, setForm ] = useState({ nombre: '', email: '', password1: '', password2 : '' });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError(false);
    setMsgError('');
  }

  const validar = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio';
    if (!form.email.trim()) return 'El Email es obligatorio';
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(form.email)) return 'El Email no es válido';
    if (form.password1.length < 4) return 'La contraseña debe contener al menos cuatro caracteres';
    if (form.password1 !== form.password2) return 'Las contraseñas no coinciden';
    return null;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const errorValidation = validar();
    if (errorValidation) {
      setMsgError(errorValidation);
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          password: form.password1
        })
      };

      const response = await fetch(endPoint, options);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || 'No se pudo crear el usuario');
      }

      const data = await response.json();
      console.log('Usuario registrado correctamente', data);

      setForm({ nombre: '', email: '', password1: '', password2: '' });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(true);
      setMsgError(err.message || 'Ocurrió un error al registrar el usuario :(');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h2 className="text-center mb-4">Registrarse</h2>

        { loading && <Loading /> }

        <form onSubmit={onSubmit}>

          <div className="mb-3">
            <label htmlFor="inputNombre" className="form-label">Nombre</label>
            <input 
              value={form.nombre} 
              onChange={onChange} 
              name="nombre" 
              id="inputNombre" 
              type="text" 
              className="form-control" 
              placeholder="Tu nombre" 
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input 
              value={form.email} 
              onChange={onChange} 
              name="email" 
              id="inputEmail" 
              type="email" 
              className="form-control" 
              placeholder="tu@email.com" 
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Contraseña</label>
            <input 
              value={form.password1} 
              onChange={onChange} 
              name="password1" 
              id="inputPassword" 
              type="password" 
              className="form-control" 
              placeholder="********" 
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPasswordRepetida" className="form-label">Repetir contraseña</label>
            <input 
              value={form.password2} 
              onChange={onChange} 
              name="password2" 
              id="inputPasswordRepetida" 
              type="password" 
              className="form-control" 
              placeholder="********" 
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            Crear Cuenta
          </button>

          { error && (
            <div className="alert alert-danger mt-3" role="alert">
              {msgError}
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/">¿Ya tenés una cuenta? Ingresa aquí</Link>
          </div>

        </form>
      </div>
    </main>
  )
}

export default Register
