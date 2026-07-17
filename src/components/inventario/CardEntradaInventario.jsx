import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../themes/colors';

// CÓMO: Crear un componente presentacional simplificado para logs de entrada.
// POR QUÉ: SRP. Muestra el string plano de la descripción del movimiento y su marca temporal de auditoría.
export default function CardEntradaInventario({ descripcion, fecha }) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.fechaText}>{fecha}</Text>
      <Text style={styles.descripcionText}>{descripcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#2E6F40', // Verde para indicar entrada/ingreso
  },
  fechaText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  descripcionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  }
});