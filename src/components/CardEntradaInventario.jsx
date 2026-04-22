import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ListProductInventory from './ListProductInventory';

export default function CardEntradaInventario({ fechaDia, fechaMes, cantidadTotal, productos }) {
  return (
    <View style={styles.cardContainer}>
      
      <View style={styles.header}>
        <Text style={styles.titleBold}>{fechaDia}, <Text style={styles.titleLight}>{fechaMes}</Text></Text>
        <Text style={styles.subtitle}>Cantidad total: {cantidadTotal}</Text>
      </View>

      <View style={styles.listContainer}>
        {productos.map((item, index) => (
          <ListProductInventory 
            key={index} 
            nombre={item.nombre} 
            cantidad={item.cantidad} 
            hora={item.hora} 
          />
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#803B43', 
    marginHorizontal: 20,
    paddingBottom: 25,
    elevation: 4,
    marginBottom: 20,
    borderRadius:20
  },
  header: {
    padding: 20,
  },
  titleBold: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  titleLight: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0C8CB',
    marginTop: 5,
  },
  listContainer: {
    backgroundColor: '#D9D9D9', 
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 15,
  }
});