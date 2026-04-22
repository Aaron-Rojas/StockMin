import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function CardProduct({ titulo, precio, stock, imagenUrl }) {
  return (
    <View style={styles.cardContainer}>
      
      <View style={styles.headerRow}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.price}>s/.{precio}</Text>
      </View>
      
      <Text style={styles.stock}>stock : {stock}</Text>
      
      <View style={styles.imageContainer}>
        {/* Usamos una imagen de red temporalmente, luego puedes usar require local */}
        <Image 
          source={{ uri: imagenUrl }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#803B43',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EAD05C',
  },
  stock: {
    fontSize: 16,
    color: '#E0C8CB',
    marginTop: 5,
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});