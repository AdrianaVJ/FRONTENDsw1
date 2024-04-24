import "./register.css"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../axiosInstance'; // Importa la instancia de Axios
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../UserContext';

export default function Register() {
  const navigate = useNavigate();
  const [, setUser] = useState(null);
  const [, setToken] = useState(null);
  const [formData, setFormData] = useState({
    ci: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: 0,
    contrasena: '',
  });
  const [, setError] = useState('');
  const { setAuthenticated } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/register', formData); 
      console.log('Usuario registrado correctamente:', response.data);

      
      const userData = JSON.stringify(response.data.user.usuario);
      const token = JSON.stringify(response.data.user.token);
      // Almacena la información del usuario en el estado local
      setUser(userData);
      setToken(token);

      window.localStorage.setItem('loggedFocusEvent', JSON.stringify({ userData, token }));
      setAuthenticated(true);

      navigate('/');

    } catch (error) {
      console.error('Error al iniciar Sesión:', error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Registro de nuevo usuario</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Número de C.I</label>
        <input
          className="registerInput"
          type="number"
          placeholder="Ingrese su C.I"
          value={formData.ci}
          onChange={(e) => setFormData({ ...formData, ci: e.target.valueAsNumber })}
        />
        <label>Nombre</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Ingrese su Nombre Completo"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <label>Apellidos</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Ingrese su Apellido Completo"
          value={formData.apellido}
          onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
        />
        <label>Dirección </label>
        <input
          className="registerInput"
          type="text"
          placeholder="Ingrese su dirección de domicilio"
          value={formData.direccion}
          onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
        />
        <label>Número de celular</label>
        <input
          className="registerInput"
          type="number"
          placeholder="Ingrese su número de celular"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.valueAsNumber })}
        />
        <label>Contraseña</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
        />
        <button className="registerButton">Registrar</button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login">Ya tienes cuenta?</Link>
      </button>
    </div>
  )
}
