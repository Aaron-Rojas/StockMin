import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// CÓMO: Inyectar el token JWT de SecureStore en la cabecera Authorization de forma asíncrona.
// POR QUY: Asegura la validez de la sesión para endpoints protegidos sin bloquear la UI principal.
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('usuarioToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error leyendo token desde SecureStore:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
