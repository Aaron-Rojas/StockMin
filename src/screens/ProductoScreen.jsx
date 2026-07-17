import { SafeAreaView, View, StyleSheet, ActivityIndicator, Text, FlatList} from 'react-native';
import React, { useState, useEffect } from 'react';

import ProductTitle from '../components/products/ProductTitle';
import ProductSearch from '../components/forms/ProductSearch';
import CardProduct from '../components/products/CardProduct';

//Importamos nuestro hooks a usar
import { useProductos } from '../hooks/useProductos';
import { COLORS } from '../themes/colors';

export default function ProductoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');

  // Extraemos lo que usará el hook
  const { productos, cargando, error, cargarProductos } = useProductos();

  // CÓMO: Recargar la lista comercial cada vez que la pantalla gana el foco del sistema.
  // POR QUÉ: Asegura que si se creó o modificó un producto en otra pantalla, los datos estén actualizados inmediatamente.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarProductos();
    });
    return unsubscribe;
  }, [navigation]);

  // CÓMO: Filtrar localmente la lista de productos por nombre, código de barras o categoría.
  // POR QUÉ: Otorga una respuesta instantánea de filtrado en la UI sin sobrecargar el servidor de base de datos con peticiones redundantes.
  const productosFiltrados = productos.filter(p => {
    const query = busqueda.toLowerCase().trim();
    if (!query) return true;
    return (
      p.nombre.toLowerCase().includes(query) ||
      p.codigoBarras.includes(query) ||
      (p.categoria && p.categoria.toLowerCase().includes(query))
    );
  });

  //Agrupamos el título y buscador para que el FlatList los ponga arriba
  const renderHeader = () => (
    <View>
      <ProductTitle />
      <ProductSearch busqueda={busqueda} setBusqueda={setBusqueda} />
      {cargando && <ActivityIndicator size="large" color={COLORS.primary} style={{marginTop: 20}} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        
        <FlatList
          data={!cargando && !error ? productosFiltrados : []} 
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.scrollContainer}
          renderItem={({item}) => 
            <CardProduct
              titulo={item.nombre} 
              precio={item.precio} 
              stock={item.stock} 
              imagenUrl={item.imagenUrl}
            /> 
          }
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
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