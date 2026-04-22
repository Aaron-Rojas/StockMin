import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function ListProductStock({ nombre, cantidad }) {
    // nombre = 'Chanka Kichachi';
    // cantidad = 13;

    return (
    <View style={styles.rowItem}>
      <Text style={styles.productText}>
        <Text style={styles.boldText}>{nombre}</Text> → restan : <Text style={styles.boldText}>{cantidad}</Text> u.
      </Text>
      
      <TouchableOpacity style={styles.iconButton}>
        <Text style={styles.iconText}>👁️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3AAAA',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFF9F9',
  },
  productText: {
    fontSize: 14,
    color: '#4A1C20',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#C93B3B',
  },
  iconButton: {
    backgroundColor: '#4A1C20',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
  },
  iconText: {
    color: '#FFF',
    fontSize: 12,
  }
});