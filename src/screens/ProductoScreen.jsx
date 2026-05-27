import { SafeAreaView, View, StyleSheet, ActivityIndicator, Text, FlatList} from 'react-native';
import React, { useState } from 'react';

import ProductTitle from '../components/products/ProductTitle';
import ProductSearch from '../components/forms/ProductSearch';
import CardProduct from '../components/products/CardProduct';

//Importamos nuestro hooks a usar
import { useProductos } from '../hooks/useProductos';

export default function ProductoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');

  //Extramoes lo que usará el hook
  const { productos, cargando, error } = useProductos();

  //Agrupamos el título y buscador para que el FlatList los ponga arriba
  const renderHeader = () => (
    <View>
      <ProductTitle />
      <ProductSearch busqueda={busqueda} setBusqueda={setBusqueda} />
      {cargando && <ActivityIndicator size="large" color="#4A1C20" style={{marginTop: 20}} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        
        <FlatList
        data={!cargando && !error ? productos: []} 
        keyExtractor={
          (item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.scrollContainer}
          renderItem={({item}) => 
          <CardProduct
            titulo={item.nombre} 
            precio={item.precio} 
            stock={item.stock} 
            imagenUrl={item.imagenUrl}
          /> 
        }/>
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