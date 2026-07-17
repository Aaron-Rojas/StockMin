import { SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import InventarioTitle from '../components/home/InventarioTitle';
import TabInventario from '../components/inventario/TabInventario';
import CardEntradaInventario from '../components/inventario/CardEntradaInventario';
import CardSalidaInvetario from '../components/inventario/CardSalidaInvetario';

import { useMovimientos } from '../hooks/useMovimientos';
import { COLORS } from '../themes/colors';

export default function InventarioScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('entrada');

  // CÓMO: Extraer el historial y cargarHistorial de useMovimientos.
  // POR QUÉ: Permite recuperar la lista plana de auditoría de movimientos del backend.
  const { historial, cargando, error, cargarHistorial } = useMovimientos();

  // CÓMO: Consultar el listado completo de movimientos cada vez que la pestaña cambie.
  // POR QUÉ: Ciclo de vida dinámico. Garantiza que el usuario reciba datos actualizados y sincronizados tras cualquier transacción en el POS.
  useEffect(() => {
    cargarHistorial();
  }, [activeTab]);

  // CÓMO: Formatear de forma robusta la fecha del backend en la zona horaria de Perú (America/Lima).
  // POR QUÉ: Estandariza la fecha no ISO del backend (reemplaza espacios por 'T' e inyecta la 'Z' de UTC) para evitar quiebres de parseo en dispositivos móviles.
  const formatearFechaPeru = (fechaString) => {
    if (!fechaString) return '';
    const fechaISO = fechaString.includes('T') ? fechaString : fechaString.replace(' ', 'T') + 'Z';
    const fechaObjeto = new Date(fechaISO);
    
    return new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: true
    }).format(fechaObjeto);
  };

  // CÓMO: Derivar las listas filtradas de entradas y salidas localmente de forma defensiva con trim().
  // POR QUÉ: Previene fallos por espacios en blanco ocultos en los strings de base de datos.
  const entradas = (historial || []).filter(item => item.tipo?.trim() === 'INGRESO_LOTE');
  const salidas = (historial || []).filter(item => item.tipo?.trim() === 'VENTA' || item.tipo?.trim() === 'MERMA');

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <InventarioTitle />
        
        <TabInventario 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {cargando && (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 20 }} />
        )}

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* Renderizado de entradas */}
        {!cargando && !error && activeTab === 'entrada' && (
          entradas.length === 0 ? (
            <Text style={styles.emptyText}>No hay registros de ingreso físico.</Text>
          ) : (
            entradas.map((item) => (
              <CardEntradaInventario 
                key={item.id}
                descripcion={item.descripcion}
                fecha={formatearFechaPeru(item.fecha)}
              />
            ))
          )
        )}

        {/* Renderizado de salidas */}
        {!cargando && !error && activeTab === 'salida' && (
          salidas.length === 0 ? (
            <Text style={styles.emptyText}>No hay registros de salidas comerciales.</Text>
          ) : (
            salidas.map((item) => (
              <CardSalidaInvetario
                key={item.id}
                descripcion={item.descripcion}
                fecha={formatearFechaPeru(item.fecha)}
              />      
            ))
          )
        )}

      </ScrollView>

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
    color: '#B70000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
    fontSize: 14,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginVertical: 30,
    fontStyle: 'italic',
    fontSize: 14,
  }
});