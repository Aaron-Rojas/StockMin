import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

export const useAuth = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Autenticar al empleado contra la base de datos de producción y obtiene el JWT y perfil.
  const iniciarSesion = async (email, password) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await api.post('/api/auth/login', { email, password });
      const { token, user } = respuesta.data;

      await SecureStore.setItemAsync('usuarioToken', token);
      await SecureStore.setItemAsync('usuarioEmail', user.email);
      
      return { exito: true, usuario: user };
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Error de conexión con el servidor.';
      setError(mensajeError);
      return { exito: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  // Leer la sesión activa desde SecureStore de forma asíncrona.
  const obtenerSesion = async () => {
    try {
      const token = await SecureStore.getItemAsync('usuarioToken');
      if (token) {
        return await SecureStore.getItemAsync('usuarioEmail');
      }
      return null;
    } catch (err) {
      console.error('Error al recuperar sesión:', err);
      return null;
    }
  };

  // Limpiar los registros de sesión en SecureStore y reiniciar estados.
  const cerrarSesion = async () => {
    try {
      await SecureStore.deleteItemAsync('usuarioToken');
      await SecureStore.deleteItemAsync('usuarioEmail');
      return true;
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      return false;
    }
  };

  return { iniciarSesion, obtenerSesion, cerrarSesion, cargando, error };
};