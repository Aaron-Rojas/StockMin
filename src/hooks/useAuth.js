import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
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
      
      // CÓMO: Disparar alerta nativa de éxito al iniciar sesión en el ViewModel.
      // POR QUÉ: Centraliza la respuesta visual positiva liberando a la pantalla de esta lógica repetitiva.
      Alert.alert("Sesión Iniciada 🔓", `¡Bienvenido, ${user.nombre || 'Colaborador'}!`);

      return { exito: true, usuario: user };
    } catch (err) {
      const status = err.response?.status;
      const mensajeError = err.response?.data?.error || 'Error de conexión con el servidor.';
      
      // CÓMO: Lanzar alerta de error únicamente para códigos de estado de negocio (400/401).
      // POR QUÉ: Evita duplicar alertas con el interceptor global de red o errores 500.
      if (status === 400 || status === 401) {
        Alert.alert("Acceso Denegado ⚠️", mensajeError);
      }

      setError(mensajeError);
      return { exito: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  // CÓMO: Registrar un nuevo empleado contra la base de datos enviando email, password y nombre.
  // POR QUÉ: Permite agregar nuevos cajeros o administradores al sistema de control de StockMin.
  const registrarUsuario = async (email, password, nombre) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await api.post('/api/auth/register', { email, password, nombre });
      const { token, user } = respuesta.data;

      // CÓMO: Almacenar de forma encriptada el JWT y email en SecureStore.
      // POR QUÉ: Permite iniciar sesión automáticamente y autorizar las peticiones HTTP subsecuentes de forma segura.
      await SecureStore.setItemAsync('usuarioToken', token);
      await SecureStore.setItemAsync('usuarioEmail', user.email);

      // CÓMO: Disparar alerta nativa de éxito al registrar usuario.
      // POR QUÉ: Centraliza la retroalimentación positiva al culminar el flujo de registro.
      Alert.alert("Registro Exitoso 🎉", "Tu cuenta ha sido creada y configurada correctamente.");

      return { exito: true, usuario: user };
    } catch (err) {
      const status = err.response?.status;
      const mensajeError = err.response?.data?.error || 'Error al registrar el usuario.';
      
      // CÓMO: Lanzar alerta de error de negocio si es error de validación o conflicto (400/409).
      // POR QUÉ: Mantiene la separación de responsabilidades y delega la red al interceptor general.
      if (status === 400 || status === 409) {
        Alert.alert("Error de Registro ⚠️", mensajeError);
      }

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

  return {
    iniciarSesion,
    obtenerSesion,
    cerrarSesion,
    login: iniciarSesion,
    register: registrarUsuario,
    logout: cerrarSesion,
    checkSession: obtenerSesion,
    cargando,
    error
  };
};