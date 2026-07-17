import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React,{useState,useEffect} from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useProductos } from '../hooks/useProductos.js';

import FastButtons from '../components/ui/FastButtons.jsx';
import ViewStock from '../components/products/ViewStock.jsx';
import { COLORS } from '../themes/colors.js';

export default function HomeScreen({ navigation }) {
  
  const [usuario, setUsuario] = useState('');
  const { obtenerSesion, cerrarSesion } = useAuth();
  const { alertasStock, loadingAlertas, cargarAlertas } = useProductos();

  useEffect(() => {
    const cargarUsuario = async () => {
      const emailGuardado = await obtenerSesion();
      if (emailGuardado) setUsuario(emailGuardado);
    };
    cargarUsuario();
    cargarAlertas();
  }, []);

  const manejarLogout = async () => {
    await cerrarSesion(); 
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.headerBar}>
        
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.secondary }}>
          Hola, {usuario || 'Usuario'}
        </Text>

        <View style={styles.placeholder} />
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={manejarLogout}
        >
          <Text style={styles.logoutText}>Cerrar Sesión </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Refactorización UI 1: Tarjeta interactiva de acceso a la bitácora */}
        <TouchableOpacity 
          style={styles.historyCard} 
          onPress={() => console.log('Navegar a Auditoría / Historial')}
        >
          <Text style={styles.historyTitle}>Auditoría / Historial</Text>
          <Text style={styles.historySubtitle}>Consultar bitácora de movimientos</Text>
        </TouchableOpacity>
        
        <FastButtons 
          onIngreso={() => navigation.navigate('IngresoProducto')}
          onVentas={() => navigation.navigate('SalidaProducto')}
        />

        {/* Refactorización UI 2: Lista de stock crítico conectada a alertas reales y loader */}
        {loadingAlertas ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 30 }} />
        ) : (
          <ViewStock productos={alertasStock} />
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
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: COLORS.background,
  },
  placeholder: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 25,
    marginTop: 20,
  },
  historyTitle: {
    color: COLORS.gold,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  historySubtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  }
});