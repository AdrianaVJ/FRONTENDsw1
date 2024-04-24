import "./login.css";
import { Link } from 'react-router-dom';
import api from '../../axiosInstance'; // Importa la instancia de Axios
import { useNavigate } from 'react-router-dom';

import React, {useState } from "react";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    ci: 0,
    contrasena: '',
  });
  const [error, setError] = useState('');
  const history = useNavigate();
  const [, setUser] = useState(null);
  const [, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', formData); 
      console.log('Inicio de sesión correctamente:', response.data.user.token);
      const userData = JSON.stringify(response.data.user.usuario);
      console.log("user iniciado : ", userData);
      const token = JSON.stringify(response.data.user.token);
      
      window.localStorage.setItem('loggedFocusEvent', JSON.stringify({ userData, token }));

      setUser(userData);
      setToken(token);

      history('/');

    } catch (error) {

      console.error('Error al iniciar Sesión:', error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Inicio de Sesión</span>
      {error && <p>{error}</p>} {/* Muestra el mensaje de error si está configurado */}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Número de C.I</label>
        <input
          type="number"
          placeholder="Ingrese su C.I"
          value={formData.ci}
          onChange={(e) => setFormData({ ...formData, ci: e.target.valueAsNumber })}
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
        />
        <button className="loginButton">Iniciar Sesión</button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register">No estás registrado?</Link>
      </button>
    </div>
  );
};

export default Login;
