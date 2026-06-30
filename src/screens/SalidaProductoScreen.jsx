import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import FormVentas from '../components/forms/FormVenta';
import ProductSearch from '../components/forms/ProductSearch';
import HeaderBack from '../components/ui/HeaderBack';

import { useProductos } from '../hooks/useProductos';
import { useMovimientos } from '../hooks/useMovimientos';

export default function SalidaProductoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');
  const [productoId, setProductoId] = useState(null);
  const [nombre, setNombre] = useState(''); 
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState(0); 
  const [total, setTotal] = useState(0);

  // CÓMO: Consumir catálogo de productos y lógica de movimientos transaccionales de inventario.
  // POR QUÉ: Permite verificar existencias reales y debitar el stock en la base de datos centralizada de producción.
  const { productos, cargando: cargandoProductos } = useProductos();
  const { registrarMovimiento, cargando: cargandoMovimiento } = useMovimientos();
  
  const cargandoGeneral = cargandoProductos || cargandoMovimiento;
  const cantidadNum = parseInt(cantidad) || 0;

  // CÓMO: Calcular dinámicamente el costo total de la transacción.
  // POR QUÉ: Otorga retroalimentación de costo al empleado en base a la cantidad ingresada y el precio real del catálogo.
  useEffect(() => {
    const nuevoTotal = cantidadNum * precio;
    setTotal(nuevoTotal);
  }, [cantidad, precio]);

  // CÓMO: Poblar por defecto el formulario con el primer producto cargado desde la API.
  // POR QUÉ: Evita campos vacíos iniciales y provee un estado de inicio de interfaz coherente.
  useEffect(() => {
    if (productos && productos.length > 0 && !productoId) {
      const primerProd = productos[0];
      setNombre(primerProd.nombre);
      setProductoId(primerProd.id);
      setPrecio(parseFloat(primerProd.precio) || 0);
    }
  }, [productos]);

  // CÓMO: Filtrar el catálogo en base al término de búsqueda ingresado.
  // POR QUÉ: Permite al empleado localizar ágilmente un artículo específico sin salir de la pantalla.
  const productosFiltrados = busqueda.trim()
    ? productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    : [];

  // CÓMO: Ejecutar la solicitud registrarMovimiento de tipo salida con el ID de producto seleccionado.
  // POR QUÉ: Sube la transacción al backend y actualiza el inventario si las validaciones de negocio son exitosas.
  const manejarGuardado = async () => {
    if (!productoId) {
      Alert.alert("Selección requerida ⚠️", "Por favor, busca y selecciona un producto válido del catálogo.");
      return;
    }

    if (cantidadNum <= 0) {
      Alert.alert(
        "Atención ⚠️",
        "Por favor, ingresa una cantidad válida mayor a 0 antes de guardar.",
        [{ text: "Entendido", style: "cancel" }]
      );
      return; 
    }

    const respuesta = await registrarMovimiento("salida", cantidadNum, productoId);
    if (respuesta && respuesta.exito) {
      Alert.alert(
        "Venta Exitosa",
        `Se registró la salida de ${cantidadNum} unidades de ${nombre}.\n\nIngreso total: S/ ${total.toFixed(2)}`,
        [
          { 
            text: "OK", 
            onPress: () => navigation.goBack() 
          }
        ]
      ); 
    } else {
      Alert.alert("Error de Registro ⚠️", respuesta?.error || "No se pudo registrar la venta en el servidor.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexContainer}>
        
        <HeaderBack onBack={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.mainTitle}>Registro de venta</Text>

          {cargandoGeneral && (
            <ActivityIndicator size="large" color="#B70000" style={{ marginBottom: 15 }} />
          )}

          <ProductSearch busqueda={busqueda} setBusqueda={setBusqueda} />  

          {/* CÓMO: Renderizar una lista desplegable flotante si hay coincidencias de búsqueda. */}
          {/* POR QUÉ: Permite autocompletar el formulario al hacer clic sobre una de las sugerencias del catálogo. */}
          {productosFiltrados.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {productosFiltrados.map((prod) => (
                <TouchableOpacity 
                  key={prod.id} 
                  style={styles.suggestionItem}
                  onPress={() => {
                    setNombre(prod.nombre);
                    setProductoId(prod.id);
                    setPrecio(parseFloat(prod.precio) || 0);
                    setBusqueda(''); // Cierra el panel de sugerencias
                  }}
                >
                  <Text style={styles.suggestionText}>{prod.nombre} (Stock: {prod.stock})</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <FormVentas
            nombre={nombre}
            setNombre={setNombre}
            cantidad={cantidad}
            setCantidad={setCantidad}
            total={total.toFixed(2)}
          />

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.btnCancel]} 
              onPress={() => navigation.goBack()}
              disabled={cargandoGeneral}
            >
              <Text style={styles.textBtn}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.btnSave, cargandoGeneral && { opacity: 0.5 }]} 
              onPress={cargandoGeneral ? null : manejarGuardado}
              disabled={cargandoGeneral}
            >
              <Text style={styles.textBtn}>Guardar Venta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        <View style={styles.footer} />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EFEA',
    paddingTop: 20,
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -10,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3D161A',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF5F0',
  },
  suggestionText: {
    fontSize: 15,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
  },
  btnCancel: {
    backgroundColor: '#4A1C20',
  },
  btnSave: {
    backgroundColor: '#B70000',
  },
  textBtn: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#4A1C20',
    height: 50,
  }
});