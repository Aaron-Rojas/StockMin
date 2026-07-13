import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// CÓMO: Inyectar el token JWT de SecureStore en la cabecera Authorization de forma asíncrona.
// POR QUÉ: Asegura la validez de la sesión para endpoints protegidos sin bloquear la UI principal.
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

// CÓMO: Manejar de forma centralizada la respuesta del servidor para detectar expiración de sesión (401) y errores globales.
// POR QUÉ: Garantiza que los fallos del servidor y desconexiones de red lancen alertas genéricas, mientras que los errores de lógica pasan al hook.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        await SecureStore.deleteItemAsync('usuarioToken');
        await SecureStore.deleteItemAsync('usuarioEmail');
        console.warn('Sesión expirada. Limpieza de SecureStore completada.');
      } catch (err) {
        console.error('Error al limpiar credenciales tras 401:', err);
      }
    }

    if (error.response) {
      const status = error.response.status;
      // Error crítico del servidor (5xx)
      if (status >= 500) {
        Alert.alert(
          'Error del Servidor ⚠️',
          'Ocurrió un problema interno en el servidor de StockMin. Por favor, inténtelo de nuevo más tarde.'
        );
      }
      // Los errores 400 y 401 pasan al Hook
    } else if (error.request) {
      // Error de red (sin respuesta)
      Alert.alert(
        'Sin Conexión 🔌',
        'No se pudo conectar con el servidor de StockMin. Verifique su conexión a Internet.'
      );
    } else {
      // Otros errores de configuración
      Alert.alert(
        'Error Inesperado ⚠️',
        'Ocurrió un error al procesar la petición.'
      );
    }

    return Promise.reject(error);
  }
);

export default api;
