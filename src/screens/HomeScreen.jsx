import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React,{useState,useEffect} from 'react';
import { useAuth } from '../hooks/useAuth.js';

import VentasDia from '../components/home/VentasDia.jsx';
import FastButtons from '../components/ui/FastButtons.jsx';
import ViewStock from '../components/products/ViewStock.jsx';

export default function HomeScreen({ navigation }) {
  
  const [usuario, setUsuario] = useState('');
  const { obtenerSesion, cerrarSesion } = useAuth();

  const listaProductos = [
    { nombre: 'Agua', cantidad: '3' },
    { nombre: 'Chanka', cantidad: '2' },
    { nombre: 'Camacho', cantidad: '1' },
  ];


  useEffect(() => {
    const cargarUsuario = async () => {
      const emailGuardado = await obtenerSesion();
      if (emailGuardado) setUsuario(emailGuardado);
    };
    cargarUsuario();
  }, []);

  const manejarLogout = async () => {
    await cerrarSesion(); 
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.headerBar}>
        
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4A1C20' }}>
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
        <VentasDia fecha="Miercoles, 22 Abril 2026" monto="70" />
        
        <FastButtons 
          onIngreso={() => navigation.navigate('IngresoProducto')}
          onVentas={() => navigation.navigate('SalidaProducto')}
        />

        <ViewStock productos={listaProductos} />
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EFEA',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#F4EFEA',

  },
  placeholder: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#4A1C20',
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
  }
});