import { useState } from 'react';
import api from '../services/api';

export const useMovimientos = () => {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // CÓMO: Realizar una petición GET al endpoint de movimientos filtrando opcionalmente por tipo.
  // POR QUÉ: Permite recuperar el historial estructurado de transacciones (entradas/salidas) de producción.
  const cargarHistorial = async (tipo = '') => {
    setCargando(true);
    setError(null);
    try {
      const url = tipo ? `/api/movimientos?tipo=${tipo}` : '/api/movimientos';
      const respuesta = await api.get(url);
      setHistorial(respuesta.data);
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Error al cargar el historial de movimientos.';
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  // CÓMO: Enviar una petición POST al endpoint de movimientos con el payload del contrato.
  // POR QUÉ: Registra una nueva transacción de almacén y descuenta o incrementa el stock automáticamente.
  const registrarMovimiento = async (tipo, cantidad, productoId, proveedor = '') => {
    setCargando(true);
    setError(null);
    try {
      const payload = {
        tipo,
        cantidad: parseInt(cantidad) || 0,
        productoId
      };
      if (tipo === 'entrada' && proveedor) {
        payload.proveedor = proveedor;
      }
      
      const respuesta = await api.post('/api/movimientos', payload);
      
      // CÓMO: Refrescar el historial local tras el registro exitoso.
      // POR QUÉ: Mantiene la UI sincronizada inmediatamente sin requerir una recarga completa de la pantalla.
      await cargarHistorial(tipo);
      
      return { exito: true, movimiento: respuesta.data };
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Error al registrar el movimiento.';
      setError(mensajeError);
      return { exito: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  return {
    historial,
    cargando,
    error,
    cargarHistorial,
    registrarMovimiento
  };
};
