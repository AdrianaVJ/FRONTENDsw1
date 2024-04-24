import axios from 'axios';

const api = axios.create({
  baseURL: 'diagrm.up.railway.app', // URL del backend
});

export default api;
