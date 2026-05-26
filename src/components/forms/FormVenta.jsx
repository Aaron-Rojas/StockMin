import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export default function FormVenta({ nombre, setNombre, cantidad, setCantidad, total }) {
  return (
    <View style={styles.card}>
      
      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Cantidad vendida</Text>
      <TextInput style={styles.input} value={cantidad} onChangeText={setCantidad} keyboardType="numeric" />

      <Text style={styles.resumenTitle}>Resumen de venta</Text>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Suma Total</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>s/{total}</Text>
        </View>
      </View>

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
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6A2E35',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
    color: '#333',
  },
  resumenTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6A2E35',
    marginTop: 10,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalBadge: {
    backgroundColor: '#FFF5F0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 1,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  }
});