import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function ListProductInventory({ nombre, cantidad, hora }) {
  return (
    <View style={styles.rowItem}>
      <Text style={styles.productText}>
        <Text style={styles.boldText}>{nombre}</Text> → <Text style={styles.boldText}>{cantidad} u.</Text> → {hora}
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
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
    
  },
  productText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#B70000',
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