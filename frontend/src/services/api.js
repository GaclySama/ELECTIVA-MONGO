import axios from 'axios';

// * Configuración de axios

const api = axios.create({
    baseURL: 'http://172.16.0.2:8000', 
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
})

export default api;