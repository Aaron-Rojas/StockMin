import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados específicos para el consolidado de alertas del Home (Módulo 2)
  const [alertasStock, setAlertasStock] = useState([]);
  const [alertasVencimiento, setAlertasVencimiento] = useState([]);
  const [loadingAlertas, setLoadingAlertas] = useState(false);
  const [errorAlertas, setErrorAlertas] = useState(null);

  // CÓMO: Realizar petición GET al endpoint de productos y mapear precioBase a precio.
  // POR QUÉ: Recupera el listado comercial y garantiza la compatibilidad con el componente Dumb CardProduct.
  const cargarProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await api.get('/api/productos');
      const mapeados = (respuesta.data || []).map(p => ({
        ...p,
        precio: parseFloat(p.precioBase) || 0
      }));
      setProductos(mapeados);
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Error al obtener catálogo de productos.';
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  // CÓMO: Consultar el endpoint de búsqueda por código de barras de forma asíncrona.
  // POR QUÉ: Permite verificar la existencia de un producto específico tras un escaneo por cámara.
  const buscarProductoPorCodigo = async (barcode) => {
    try {
      const respuesta = await api.get(`/api/productos/barcode/${barcode}`);
      return { exito: true, producto: respuesta.data };
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Producto no registrado.';
      return { exito: false, error: mensajeError };
    }
  };

  // CÓMO: Registrar un lote físico en el inventario apuntando a POST /api/lotes con +6 meses de vencimiento.
  // POR QUÉ: Incrementa el stock físico del producto. Centraliza el cálculo de fecha de vencimiento e inyecta alertas de negocio.
  const registrarLote = async (productoId, cantidad) => {
    setCargando(true);
    try {
      // CÓMO: Calcular automáticamente una fecha de vencimiento configurada a +6 meses a partir de hoy.
      // POR QUÉ: Cumple la política comercial sin alterar la UI con un selector de fecha manual.
      const fechaVencimiento = new Date();
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 6);

      const respuesta = await api.post('/api/lotes', {
        productoId: parseInt(productoId),
        cantidadDisponible: parseInt(cantidad) || 0,
        fechaVencimiento: fechaVencimiento.toISOString()
      });

      Alert.alert("Éxito 🎉", "Lote físico de mercancía registrado correctamente.");
      return { exito: true, lote: respuesta.data };
    } catch (err) {
      const status = err.response?.status;
      const mensajeError = err.response?.data?.error || 'Error al registrar el lote físico.';
      
      if (status === 400 || status === 404) {
        Alert.alert("Error de Lote ⚠️", mensajeError);
      }
      return { exito: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  // CÓMO: Realizar una petición POST con el payload estricto del contrato v2 para catálogo (sin stock inicial).
  // POR QUÉ: Registra comercialmente el producto en la BD. Lanza alertas de éxito/negocio centralizadamente.
  const crearProducto = async (datosProducto) => {
    setCargando(true);
    try {
      const respuesta = await api.post('/api/productos', {
        nombre: datosProducto.nombre,
        categoria: datosProducto.categoria || 'General',
        codigoBarras: datosProducto.codigoBarras,
        precioBase: datosProducto.precio || datosProducto.precioBase,
        stockMinimo: parseInt(datosProducto.stockMinimo) || 5,
        imagenUrl: "" // CÓMO: Inyectar string vacío por defecto. POR QUÉ: Satisface el contrato de la API sin requerir carga visual de fotos.
      });

      const productoCreado = respuesta.data;
      const productoMapeado = {
        ...productoCreado,
        precio: parseFloat(productoCreado.precioBase) || 0
      };

      setProductos((prev) => [...prev, productoMapeado]);
      Alert.alert("Éxito 🎉", "Ficha comercial del producto registrada correctamente.");
      return { exito: true, producto: productoMapeado };
    } catch (err) {
      const status = err.response?.status;
      const mensajeError = err.response?.data?.error || 'Error al registrar el producto.';
      
      if (status === 400 || status === 409) {
        Alert.alert("Error de Registro ⚠️", mensajeError);
      }
      return { exito: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  // CÓMO: Realizar una petición PUT con el ID del producto y los campos comerciales modificados.
  // POR QUÉ: Actualiza los metadatos comerciales de la ficha y alerta de forma centralizada al cajero.
  const actualizarProducto = async (id, datosProducto) => {
    setCargando(true);
    try {
      const respuesta = await api.put(`/api/productos/${id}`, datosProducto);
      
      const productoMapeado = {
        ...respuesta.data,
        precio: parseFloat(respuesta.data.precioBase) || 0
      };

      setProductos((prev) =>
        prev.map((prod) => (prod.id === id ? productoMapeado : prod))
      );
      Alert.alert("Éxito 🎉", "Ficha comercial del producto actualizada.");
      return { exito: true, producto: productoMapeado };
    } catch (err) {
      const status = err.response?.status;
      const mensajeError = err.response?.data?.error || 'Error al actualizar el producto.';
      
      if (status === 400 || status === 409) {
        Alert.alert("Error de Actualización ⚠️", mensajeError);
      }
      return { exito: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  // CÓMO: Consumir el endpoint consolidado de alertas del inventario.
  // POR QUÉ: Obtiene productos con bajo stock y lotes por vencer mapeándolos a la interfaz del Dashboard.
  const cargarAlertas = async () => {
    setLoadingAlertas(true);
    setErrorAlertas(null);
    try {
      const respuesta = await api.get('/api/productos/alertas');
      
      // Mapeamos a la estructura esperada por el Dumb Component ViewStock { nombre, cantidad }
      const stockMapeado = (respuesta.data.alertasStockMinimo || []).map(item => ({
        nombre: item.nombreProducto,
        cantidad: item.stockActual.toString()
      }));

      setAlertasStock(stockMapeado);
      setAlertasVencimiento(respuesta.data.alertasVencimiento || []);
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Error al obtener alertas de inventario.';
      setErrorAlertas(mensajeError);
    } finally {
      setLoadingAlertas(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return {
    productos,
    cargando,
    error,
    cargarProductos,
    buscarProductoPorCodigo,
    crearProducto,
    actualizarProducto,
    registrarLote,
    alertasStock,
    alertasVencimiento,
    loadingAlertas,
    errorAlertas,
    cargarAlertas
  };
};