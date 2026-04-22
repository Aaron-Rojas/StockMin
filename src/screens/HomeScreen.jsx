import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import React from 'react';

import VentasDia from '../components/VentasDia.jsx';
import FastButtons from '../components/FastButtons.jsx';
import ViewStock from '../components/ViewStock.jsx';
import NavBar from '../components/NavBar.jsx';

export default function HomeScreen({ onNavigate }) {
  // const [activeRoute, setActiveRoute] = useState('home');

  const listaProductos = [
    { nombre: 'Agua', cantidad: '3' },
    { nombre: 'Chanka', cantidad: '2' },
    { nombre: 'Camacho', cantidad: '1' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <VentasDia fecha="Miercoles, 22 Abril 2026" monto="70" />
        
        <FastButtons 
          onIngreso={() => console.log("Ir a ingreso")}
          onVentas={() => console.log("Ir a ventas")}
        />

        <ViewStock productos={listaProductos} />
      </ScrollView>

      <NavBar activeRoute="home" setActiveRoute={onNavigate} />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EFEA',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  }
});