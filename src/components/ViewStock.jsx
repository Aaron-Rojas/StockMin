import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ListProductStock from './ListProductStock';

export default function ViewStock({ productos }) {
   // productos= ['Chanka Kichachi', 'Camacho', 'San Carlos'];
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Stock</Text>
      
      <View style={styles.cardBorder}>
        <Text style={styles.subTitle}>Lista de productos cerca a terminar</Text>
        
        {productos.map((item, index) => {
          return (
            <ListProductStock 
              key={index} 
              nombre={item.nombre} 
              cantidad={item.cantidad} 
            />
          );
        })}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A1C20',
    marginBottom: 10,
    marginLeft: 5,
  },
  cardBorder: {
    borderWidth: 1.5,
    borderColor: '#C93B3B',
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#FBF5F5',
  },
  subTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#C93B3B',
    marginBottom: 15,
  }
});