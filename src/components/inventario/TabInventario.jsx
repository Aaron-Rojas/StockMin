import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../themes/colors';

// CÓMO: Crear un selector de pestañas (Tab) interactivo para alternar la vista del historial.
// POR QUÉ: SRP. Permite al usuario filtrar visualmente entre movimientos de entrada y salida sin recargas.
export default function TabInventario({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, activeTab === 'entrada' ? styles.activeBg : styles.inactiveBg]}
        onPress={() => setActiveTab('entrada')}
      >
        <Text style={styles.text}>Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, activeTab === 'salida' ? styles.activeBg : styles.inactiveBg]}
        onPress={() => setActiveTab('salida')}
      >
        <Text style={styles.text}>Salida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
    marginHorizontal: 40,
    marginBottom: 30,
    elevation: 3,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  activeBg: {
    backgroundColor: COLORS.primary,
  },
  inactiveBg: {
    backgroundColor: 'transparent',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});