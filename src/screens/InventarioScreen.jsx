import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import InventarioTitle from '../components/home/InventarioTitle';
import TabInventario from '../components/inventario/TabInventario';
import CardEntradaInventario from '../components/inventario/CardEntradaInventario';

import NavBar from '../components/ui/NavBar';
import CardSalidaInvetario from '../components/inventario/CardSalidaInvetario';

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