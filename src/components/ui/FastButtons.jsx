import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function FastButtons({ onIngreso, onVentas }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acciones rápidas</Text>
      
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.btnYellow]} onPress={onIngreso}>
          <Text style={styles.btnText}>Ingreso de{"\n"}productos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnGreen]} onPress={onVentas}>
          <Text style={styles.btnText}>Ventas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A1C20',
    marginBottom: 15,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginHorizontal: 5,
  },
  btnYellow: {
    backgroundColor: '#D1A73E',
  },
  btnGreen: {
    backgroundColor: '#578C7B',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#C4A4A4',
    marginHorizontal: 40,
  }
});