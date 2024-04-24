import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext';

const token = localStorage.getItem('token');
const userData = JSON.parse(localStorage.getItem('userData'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <UserProvider initialAuthenticated={!!token} initialUserData={userData}>
    <script src="https://unpkg.com/gojs@2.3.11/release/go.js"></script>

    <App />
  </UserProvider>
);