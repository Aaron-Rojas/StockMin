import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import InventarioTitle from '../components/InventarioTitle';
import TabInventario from '../components/TabInventario';
import CardEntradaInventario from '../components/CardEntradaInventario';

import NavBar from '../components/NavBar';
import CardSalidaInvetario from '../components/CardSalidaInvetario';

export default function InventarioScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('entrada');

  const listaMovimientos = [
    { nombre: 'Agua', cantidad: '3', hora: '16:35 pm' },
    { nombre: 'Chanka', cantidad: '3', hora: '16:35 pm' },
    { nombre: 'Camacho', cantidad: '3', hora: '16:35 pm' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <InventarioTitle />
        
        <TabInventario 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {activeTab === 'entrada' && (
          <CardEntradaInventario 
              fechaDia="Hoy" 
              fechaMes="22 de Abril" 
              cantidadTotal="15" 
              productos={listaMovimientos} 
          />
        )}

        {activeTab  === 'salida' &&(
        <CardSalidaInvetario
              fechaDia="Hoy" 
              fechaMes="22 de Abril" 
              cantidadTotal="15" 
              productos={listaMovimientos}        
        />      
        )}

      </ScrollView>

      <NavBar 
        activeRoute="inventario" 
        setActiveRoute={onNavigate} 
      />
      
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