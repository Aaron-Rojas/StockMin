import { SafeAreaView, ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';

import HeaderBack from '../components/HeaderBack';
import FormIngreso from '../components/FormIngreso';
import ActionButtons from '../components/ActionButtons';

export default function IngresoProductoScreen({ onNavigate }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [proveedor, setProveedor] = useState('');

  const manejarGuardado = () => {
    console.log("Guardando:", { nombre, precio, stock, proveedor });
    // Después de guardar, regresamos al Home
    onNavigate('home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        <HeaderBack onBack={() => onNavigate('home')} />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.mainTitle}>Ingreso de Producto</Text>

          <FormIngreso 
            nombre={nombre} setNombre={setNombre}
            precio={precio} setPrecio={setPrecio}
            stock={stock} setStock={setStock}
            proveedor={proveedor} setProveedor={setProveedor}
          />

          <ActionButtons 
            onCancel={() => onNavigate('home')} 
            onSave={manejarGuardado} 
          />
        </ScrollView>
        
        <View style={styles.footer} />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EFEA', 
    paddingTop:25
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 20,
  },
  footer: {
    backgroundColor: '#4A1C20',
    height: 50,
  }
});