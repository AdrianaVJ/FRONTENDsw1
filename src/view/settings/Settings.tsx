import "./settings.css";
// import Sidebar from "../../components/sidebar/Sidebar";

export default function Settings() {
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Actualiza Tu cuenta</span>
          <span className="settingsTitleDelete">Eliminar Cuenta</span>
        </div>
        <form className="settingsForm">
          <label>Foto de Perfil</label>
          <div className="settingsPP">
            <img
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Número de C.I</label>
          <input type="text" placeholder="" name="name" />
          <label>Apellidos</label>
          <input type="text" placeholder="" name="name" />
          <label>Contraseña</label>
          <input type="password" placeholder="Contraseña" name="password" />
          <button className="settingsSubmitButton" type="submit">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}
