import { SafeAreaView, ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import HeaderBack from '../components/ui/HeaderBack';
import FormIngreso from '../components/forms/FormIngreso';
import ActionButtons from '../components/ui/ActionButtons';
import { useProductos } from '../hooks/useProductos';

export default function IngresoProductoScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');

  // CÓMO: Extraer el método crearProducto y el estado cargando de useProductos.
  // POR QUÉ: Permite interactuar asíncronamente con el backend de producción para insertar el catálogo.
  const { crearProducto, cargando } = useProductos();

  // CÓMO: Validar que todos los campos del payload existan y llamar a crearProducto.
  // POR QUÉ: Evita registrar productos inválidos y bloquea flujos de navegación si ocurre un error de base de datos.
  const manejarGuardado = async () => {
    if (!nombre.trim() || !precio.trim() || !stock.trim() || !codigoBarras.trim()) {
      Alert.alert("Campos incompletos ⚠️", "Por favor completa el nombre, precio, stock y código de barras.");
      return;
    }

    const payload = {
      nombre,
      precio,
      stock,
      codigoBarras,
      proveedor
    };

    const respuesta = await crearProducto(payload);
    if (respuesta && respuesta.exito) {
      Alert.alert("Guardado Exitoso", `Se registró el producto ${nombre} correctamente.`);
      navigation.goBack();
    } else {
      Alert.alert("Error de Registro ⚠️", respuesta?.error || "Ocurrió un problema de red.");
    }
  };

  const abrirEscaner = () => {
    Alert.alert("Cámara 📷", "Funcionalidad de escaneo por cámara próximamente.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        <HeaderBack onBack={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.mainTitle}>Ingreso de Producto</Text>

          {cargando && (
            <ActivityIndicator size="large" color="#6A2E35" style={{ marginBottom: 15 }} />
          )}

          <FormIngreso 
            nombre={nombre} setNombre={setNombre}
            precio={precio} setPrecio={setPrecio}
            stock={stock} setStock={setStock}
            proveedor={proveedor} setProveedor={setProveedor}
            codigoBarras={codigoBarras} setCodigoBarras={setCodigoBarras}
            onScanPress={abrirEscaner}
          />

          <ActionButtons 
            onCancel={() => navigation.goBack()} 
            onSave={cargando ? () => {} : manejarGuardado} 
          />
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
    paddingTop: 25
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 20,
  },
  footer: {
    backgroundColor: '#4A1C20',
    height: 50,
  }
});