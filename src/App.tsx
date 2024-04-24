import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./view/homepage/Homepage";
import Login from "./view/login/Login";
import Register from "./view/register/Register";
import Reunion from './view/Reunion/Reunion';
import Settings from "./view/settings/Settings";
import Single from "./view/single/Single";
import Write from "./view/write/Write";
import Topbar from "./components/topbar/topbar";

export default function App() {

  const localData = window.localStorage.getItem('loggedFocusEvent') !== null ? window.localStorage.getItem('loggedFocusEvent') : null;
  const isLoggedIn = localData !== null && Object.keys(localData).length !== 0;


  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/register" element={isLoggedIn ? <Homepage /> : <Register />} />
        <Route path="/login" element={isLoggedIn ? <Homepage /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/diagramas" element={isLoggedIn ? <Write /> : <Login />} />
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Login />} />
        <Route path='/reunion/:id/:codigo' element={<Reunion />} />
      </Routes>
    </Router>
  );
}