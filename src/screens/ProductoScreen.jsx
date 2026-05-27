import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';

import ProductTitle from '../components/products/ProductTitle';
import ProductSearch from '../components/forms/ProductSearch';
import CardProduct from '../components/products/CardProduct';
import NavBar from '../components/ui/NavBar';

//Importamos nuestro hooks a usar
import { useProductos } from '../hooks/useProductos';

export default function ProductoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');

  //Extramoes lo que usará el hook
  const { productos, cargando, error } = useProductos();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <ProductTitle />
        
        <ProductSearch 
          busqueda={busqueda} 
          setBusqueda={setBusqueda} 
        />

        {/* Pantalla de Carga  */}
        {cargando && <ActivityIndicator size="large" color="#4A1C20" />}
        
        {/* Si en caso, falla */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {!cargando && !error && productos.map((item) => (
              <CardProduct 
                key={item.id}
                titulo={item.nombre} 
                precio={item.precio} 
                stock={item.stock} 
                imagenUrl={item.imagenUrl} 
              />
            ))}
        

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
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  }
});