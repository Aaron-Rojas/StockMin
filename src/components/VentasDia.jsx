import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function VentasDia({ fecha, monto }) {
  // fecha = 'Miercoles, 22 de Abril';
  // monto = 70;
  
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Ventas del día</Text>
      <View style={styles.card}>
        <Text style={styles.dateText}>{fecha}</Text>
        <Text style={styles.priceText}>S/{monto}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    paddingTop:20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A1C20',
    marginBottom: 10,
    marginLeft: 5,
  },
  card: {
    backgroundColor: '#803B43',
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 3,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  priceText: {
    color: '#EAD05C',
    fontSize: 55,
    fontWeight: 'bold',
  }
});