//Respetando el patron MVVM, hooks/useProducto, será nuestro caso de uso, más adelante será este quien se comunique con el backend
import React,{useState, useEffect} from 'react'

import productosData from "../data/productos.json"

export const useProductos = () =>   {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    try {
      setProductos(productosData);
      setError(null);
    } catch (err) {

      setError("Error al cargar la base de datos.");
    } finally {
      setCargando(false);
    }
  }, []);
  return { productos, cargando, error };
};