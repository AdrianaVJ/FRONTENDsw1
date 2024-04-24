import "./posts.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useUserContext } from "../../UserContext";
const Posts: React.FC = () => {
  const { logout } = useUserContext();
  
  const localData = window.localStorage.getItem('loggedFocusEvent') !== null ? window.localStorage.getItem('loggedFocusEvent') : null;




  const localDataParsed = localData && localData !== 'null' ? JSON.parse(localData) : null;

  const userData = localDataParsed && Object.keys(localDataParsed).length > 0 ? JSON.parse(localDataParsed.userData) : null;

  const navigate = useNavigate()
  const socket = io('http://localhost:3001/reunion');

  const [password, setPassword] = useState('');

  // Estado para controlar el valor del campo de entrada
  const [codigoReunion, setCodigoReunion] = useState('');
  const [meetingDetails, setMeetingDetails] = useState({
    name: '',
    description: '',
  });
  

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Emitir un evento 'crearReunion' con los detalles de la reunión al servidor
      console.log('userData.id : ', userData.id)
      if (userData.id === null || userData.id === undefined) {
        logout();
        localStorage.removeItem('token'); 
        localStorage.removeItem('userData');
        navigate('/');
      } else {

        socket.emit('crearReunion', {
          usuarioId: userData.id,
          titulo: meetingDetails.name,
          descripcion: meetingDetails.description,
          codigoReunion: codigoReunion,
        });
        console.log('Reunión creando:');

        
        socket.on('reunionCreada', (data) => {
          // console.log('Reunión creada:', data.diagrama);
          console.log('Reunión creando2: ', data);
          closeModal();
          console.log('datos obtenidos del backend para unirse a reunion : ', data.reunion.id);

          // Redirige a la página de reunión con el ID y el código
          navigate(`/reunion/${data.reunion.id}/${data.codigo}`, {
            state: { diagramaModel: '', tipo: 'nueva', password: data.reunion.password, usuarioId: data.usuarioId },
          });
        });
      }

    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje al usuario
      console.error('Error al crear la reunión:', error);
    }
  };
  // Función para manejar cambios en el campo de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEntrarClick = () => {
    if (codigoReunion.trim() !== '' && password.trim() !== '') {
      try {
        // Emitir un evento 'entrarReunion' con el código y contraseña al servidor
        socket.emit('unirseReunion', { codigoReunion, password, usuarioId: userData.id });
        socket.on('unirseReunionExitoso', (data) => {
          // console.log('data.diagrama.contenido : ', data);

          // const diagramaData = JSON.parse(data.diagrama.contenido);

          // Redirigir a la página de reunión con el ID y el código
          // navigate(`/reunion/${data.id}/${data.codigo}`); //antes estaba on
          navigate(`/reunion/${data.id}/${data.codigo}`, {
            state: { tipo: 'unirse', usuarioId: userData.id },
          });
        });

      } catch (error) {
      
        console.error('Error al entrar en la reunión:', error);
      }
    } else {
      
      console.error('Por favor, ingresa un código de reunión y una contraseña.');
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setModalOpen(true);
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
  }
  return (
    <div>
      <main>
        <section className="hero">
          <h1>Reuniones virtuales fáciles y efectivas</h1>
          <p>Conéctate con colegas y amigos en cualquier lugar y en cualquier momento.</p>
          <button onClick={openModal}>Iniciar una reunión</button>
          <div>
            <input
              type="text"
              placeholder="Código de reunión"
              value={codigoReunion}
              onChange={(e) => setCodigoReunion(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleEntrarClick}>Entrar</button>
          </div>

        </section>
      </main>
      {/* Modal */}
      {/* @ts-ignore */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Iniciar una reunión</h2>
            {/* Formulario para crear la reunión */}
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={meetingDetails.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={meetingDetails.description}
                onChange={handleInputChange}
                required
              />
              <button type="submit" >Crear Reunión</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
