import { SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import InventarioTitle from '../components/home/InventarioTitle';
import TabInventario from '../components/inventario/TabInventario';
import CardEntradaInventario from '../components/inventario/CardEntradaInventario';
import CardSalidaInvetario from '../components/inventario/CardSalidaInvetario';

import { useMovimientos } from '../hooks/useMovimientos';

export default function InventarioScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('entrada');

  // CÓMO: Extraer el historial, el estado cargando, el estado de error y cargarHistorial de useMovimientos.
  // POR QUÉ: Permite sincronizar y consultar dinámicamente las transacciones según la pestaña seleccionada.
  const { historial, cargando, error, cargarHistorial } = useMovimientos();

  // CÓMO: Ejecutar cargarHistorial cada vez que el usuario cambia entre la pestaña de entradas y salidas.
  // POR QUÉ: Mantiene la lista limpia y solicita únicamente los datos que el usuario desea auditar.
  useEffect(() => {
    cargarHistorial(activeTab);
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <InventarioTitle />
        
        <TabInventario 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {cargando && (
          <ActivityIndicator size="large" color="#803B43" style={{ marginVertical: 20 }} />
        )}

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* CÓMO: Mapear el historial dinámico recibido de la API para renderizar las tarjetas. */}
        {/* POR QUÉ: Permite pintar múltiples días de transacciones reales sin alterar las propiedades o estilos del Dumb Component. */}
        {!cargando && !error && activeTab === 'entrada' && historial.map((diaInfo, idx) => (
          <CardEntradaInventario 
            key={idx}
            fechaDia={diaInfo.fechaDia} 
            fechaMes={diaInfo.fechaMes} 
            cantidadTotal={diaInfo.cantidadTotal} 
            productos={diaInfo.productos} 
          />
        ))}

        {!cargando && !error && activeTab === 'salida' && historial.map((diaInfo, idx) => (
          <CardSalidaInvetario
            key={idx}
            fechaDia={diaInfo.fechaDia} 
            fechaMes={diaInfo.fechaMes} 
            cantidadTotal={diaInfo.cantidadTotal} 
            productos={diaInfo.productos}        
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
    color: '#B70000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
    fontSize: 14,
    paddingHorizontal: 20,
  }
});