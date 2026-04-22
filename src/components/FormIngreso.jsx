import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function FormIngreso({ nombre, setNombre, precio, setPrecio, stock, setStock, proveedor, setProveedor }) {
  return (
    <View style={styles.card}>
      
      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Precio de Venta</Text>
      <TextInput style={styles.input} placeholder="S/." value={precio} onChangeText={setPrecio} keyboardType="numeric" />

      <Text style={styles.label}>Cantidad de Stock</Text>
      <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" />

      <Text style={styles.label}>Proveedor <Text style={styles.opcional}>* opcional</Text></Text>
      <TextInput style={styles.input} value={proveedor} onChangeText={setProveedor} />

      <Text style={styles.label}>Imagen <Text style={styles.opcional}>* opcional</Text></Text>
      
      {/* Botón simulado para subir foto */}
      <TouchableOpacity style={styles.photoButton} onPress={() => console.log('Abrir galería')}>
        <Text style={styles.cameraIcon}>📷</Text>
        <Text style={styles.photoText}>subir foto</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A2E35',
    marginBottom: 5,
  },
  opcional: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#999',
  },
  input: {
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    color: '#333',
  },
  photoButton: {
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  cameraIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  photoText: {
    color: '#888',
    fontSize: 14,
  }
});