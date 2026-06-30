import { useState, useEffect } from 'react';
import api from '../services/api';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // CÓMO: Realizar petición GET al endpoint de productos.
  // POR QUÉ: Recupera el listado del catálogo en tiempo real desde la base de datos de producción.
  const cargarProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await api.get('/api/productos');
      setProductos(respuesta.data);
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

  // CÓMO: Realizar una petición POST con los atributos estructurados en el contrato JSON.
  // POR QUÉ: Registra un nuevo producto en la base de datos centralizada de producción.
  const crearProducto = async (datosProducto) => {
    setCargando(true);
    try {
      const respuesta = await api.post('/api/productos', {
        nombre: datosProducto.nombre,
        precio: datosProducto.precio,
        stock: parseInt(datosProducto.stock) || 0,
        codigoBarras: datosProducto.codigoBarras,
        imagenUrl: datosProducto.imagenUrl || 'https://via.placeholder.com/150'
      });
      setProductos((prev) => [...prev, respuesta.data]);
      return { exito: true, producto: respuesta.data };
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Error al registrar el producto.';
      return { exito: false, error: mensajeError };
    } finally {
      setCargando(false);
    }
  };

  // CÓMO: Realizar una petición PUT con el ID del producto y los campos modificados.
  // POR QUÉ: Actualiza la información del producto (catálogo o stock) en producción.
  const actualizarProducto = async (id, datosProducto) => {
    setCargando(true);
    try {
      const respuesta = await api.put(`/api/productos/${id}`, datosProducto);
      setProductos((prev) =>
        prev.map((prod) => (prod.id === id ? respuesta.data : prod))
      );
      return { exito: true, producto: respuesta.data };
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Error al actualizar el producto.';
      return { exito: false, error: mensajeError };
    } finally {
      setCargando(false);
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
    actualizarProducto
  };
};