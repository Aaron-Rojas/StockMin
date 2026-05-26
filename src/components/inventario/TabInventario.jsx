import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

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
    backgroundColor: '#4A1C20',
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
    backgroundColor: '#B70000',
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