import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function InventarioTitle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimientos del{"\n"}Inventario</Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    paddingTop:20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3D161A',
    textAlign: 'center',
  },
  separator: {
    height: 1.5,
    backgroundColor: '#6A2E35',
    width: '70%',
    marginTop: 15,
  }
});