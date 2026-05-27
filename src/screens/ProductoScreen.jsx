import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import ProductTitle from '../components/products/ProductTitle';
import ProductSearch from '../components/forms/ProductSearch';
import CardProduct from '../components/products/CardProduct';
import NavBar from '../components/ui/NavBar';

export default function ProductoScreen({ onNavigate }) {
  const [busqueda, setBusqueda] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <ProductTitle />
        
        <ProductSearch 
          busqueda={busqueda} 
          setBusqueda={setBusqueda} 
        />
        
        <CardProduct 
          titulo="Chanka Kichachi" 
          precio="45" 
          stock="9" 
          imagenUrl="https://chanka-kichachi.web.app/wp-content/uploads/2025/03/Chanka-Kichachi-625ml-1-1024x682.png" 
        />

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EFEA',
  },
  scrollContainer: {
    paddingBottom: 20,
  }
});