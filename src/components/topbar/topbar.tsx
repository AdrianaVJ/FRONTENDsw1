import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
  const navigate = useNavigate();

  const localData = window.localStorage.getItem('loggedFocusEvent') !== null ? window.localStorage.getItem('loggedFocusEvent') : null;
  
  const isLoggedIn = localData !== null && Object.keys(localData).length !== 0;


  const localDataParsed = localData && localData !== 'null' ? JSON.parse(localData) : null;

  const userData = localDataParsed && Object.keys(localDataParsed).length > 0 ? JSON.parse(localDataParsed.userData) : null;


  const handleLogout = () => {
    window.localStorage.removeItem('loggedFocusEvent');

    navigate('/'); // Redirige a la página de inicio
  };
  return (
    <div className="top">
      <div className="topLeft">{/* Contenido del lado izquierdo de la barra superior */}</div>
      <div className="topRight">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Inicio
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link, topListItem" to="/diagramas">
              Tus Diagramas
            </Link>
          </li>
          <li className="topListItem">Sobre Mí</li>
          <li className="topListItem">Contáctame</li>
        </ul>
      </div>
      <div className="topRight">
        {isLoggedIn ? (
          <div className="">
            <ul className="topList">
              {userData && (
                <li className="topListItem" style={{ marginTop: '25px', cursor: 'text' }}>
                  {userData.nombre} {userData.apellido}
                </li>
              )}

              <li>
                <Link className="link" to="/settings">
                  <img
                    className="topImg" style={{ marginTop: '17px' }}
                    src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                </Link>
              </li>
              <li>
                <button className="topLogoutButton" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                Iniciar Sesión
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                Crear Cuenta
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default Topbar;
